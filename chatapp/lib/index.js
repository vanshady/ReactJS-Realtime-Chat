const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const socket = require('./routes/socket.js');
const handleRender = require('./routes/handleRender');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

/* Configuration */
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(handleRender);

/* Socket.io Communication */
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

/* Start server */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
