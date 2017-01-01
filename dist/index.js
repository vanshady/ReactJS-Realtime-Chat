'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var socket = require('./routes/socket.js');
var handleRender = require('./routes/handleRender');

var app = express();
var server = http.createServer(app);

var port = process.env.PORT || 3000;

/* Configuration */
app.use(express.static(path.join(__dirname, '/client/public')));
app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(handleRender);

/* Socket.io Communication */
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;