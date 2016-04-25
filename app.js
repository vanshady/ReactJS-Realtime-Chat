
/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');

const socket = require('./routes/socket.js');

const app = express();
const server = http.createServer(app);

const mongoose = require('mongoose');
mongoose.set('debug', true);

const uri = process.env.MONGODB_URI ||
    'mongodb://localhost/vanshadychat';

const port = process.env.PORT || 3000;

/* Configuration */
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('port', port);

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
io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
