const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const reducers = require('../../src/reducers/index.js').default;
const ChatApp = require('../../src/components/ChatApp.jsx').default;
const { chatMiddleware } = require('../../src/chat.js');
const redis = require('redis');

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>ReactJS Socket.io Chat Application</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

        <link rel="shortcut icon" href="http://chat.mwxu.me/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <div id="app">${html}</div>
        <script>
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-67391005-2', 'auto');
            ga('send', 'pageview');
        </script>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
        </script>
        <script async src="/js/bundle.js"></script>
    </body>

    </html>`;
}

module.exports = function handleRender(req, res) {
  console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
  const client = redis.createClient('6379', 'redis');
//   const client = redis.createClient(process.env.REDIS_URL);

  client.lrange('chatroom:public:messages', 0, -1, (err, reply) => {
    if (err) throw err;
    const preloadedState = { name: '', users: [], messages: reply.map(item => JSON.parse(item)) };
    // Create a new Redux store instance
    const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
    const store = createStoreWithMiddleware(reducers, preloadedState);

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <ChatApp />
      </Provider>);

    res.send(renderFullPage(html, store.getState()));
  });
};
