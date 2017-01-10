const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const reducers = require('../../src/reducers/index.js').default;
const ChatApp = require('../../src/components/ChatApp.jsx').default;
const { chatMiddleware } = require('../../src/chat.js');
const redis = require('redis');
const IndexHtml = require('fs').readFileSync('lib/routes/index.html');
const format = require('es6-template-strings');

function renderFullPage(html, preloadedState) {
  return format(IndexHtml, { html, preloadedState: JSON.stringify(preloadedState) });
}

module.exports = function handleRender(req, res) {
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
