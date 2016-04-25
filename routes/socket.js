const Message = require('./message');

// Keep track of which names are used so that there are no duplicates
const userNames = (function () {
  const names = {};

  const claim = (name) => {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  const getGuestName = () => {
    var name;
    var nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  const get = () => {
    const res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  const free = (name) => {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim,
    free,
    get: get,
    getGuestName,
  };
}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = userNames.getGuestName();

  var messages = [];
  Message.find({}, function (err, docs) {
    if (err) throw err;
    console.log(docs);
    messages.push(docs);
  })
    .exec((err, data) => { messages.push(data); });
  console.log('Messages: ' + messages);
  // send the new user their name and a list of users
  socket.emit('init', {
    name,
    messages,
    users: userNames.get(),
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name,
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {

    const newMessage = new Message({
      user: name,
      text: data.text,
    });
    console.log('NEW: ' + newMessage);
    newMessage.save((err) => {
      if (err) console.log(err);
    });

    socket.broadcast.emit('send:message', {
      user: name,
      text: data.text,
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      const oldName = name;
      userNames.free(oldName);

      name = data.name;

      socket.broadcast.emit('change:name', {
        oldName,
        newName: name,
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name,
    });
    userNames.free(name);
  });
};
