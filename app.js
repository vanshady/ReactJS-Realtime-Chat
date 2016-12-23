
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const socketCookieParser = require('socket.io-cookie');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('./routes/socket.js');

const app = express();
const server = http.createServer(app);

mongoose.set('debug', true);

const uri = process.env.MONGODB_URI ||
    'mongodb://localhost/vanshadychat';

const port = process.env.PORT || 3000;

/* Configuration */
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};
mongoose.connect(uri, options);

/* Socket.io Communication */
const io = require('socket.io').listen(server);

io.use(socketCookieParser);
// io.use((soc, next) => {
//   if (soc.request.headers.cookie) {
//     console.log(soc.request.headers.cookie);
//   }
//   next();
// });

io.sockets.on('connection', socket);

app.post('/name', (req, res) => {
  // console.log('post name');
  const minute = 60 * 1000;
  // console.log(req.body);
  if (req.body.name) {
    // console.log(req.body.name);
    res.cookie('name', req.body.name, { maxAge: minute });
    res.end('Success');
  } else {
    res.end('Failed');
  }
});

/* Start server */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
