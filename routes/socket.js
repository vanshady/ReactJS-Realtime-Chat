// Keep track of which names are used so that there are no duplicates
const userNames = (function () {
  const names = {};

  const claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  const getGuestName = function () {
    var name;
    var nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  const get = function () {
    const res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  const free = function (name) {
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

// Keep track of which messages are used so that there are no duplicates
const historyMessages = (function () {
  var messages = [];

  const claim = function (message) {
    if (!message || messages[message]) {
      return false;
    } else {
      messages[message] = true;
      return true;
    }
  };

  // serialize claimed messages as an array
  const get = function () {
    return messages;
  };

  const add = function (user, text) {
    if (messages.length === 50) {
      messages.shift();
    }
    messages.push({ user, text });
  };

  const free = function (name) {
    if (messages[name]) {
      delete messages[name];
    }
  };

  return {
    claim,
    free,
    get: get,
    add: add,
  };
}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = userNames.getGuestName();
  var messages = historyMessages.get();

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
    historyMessages.add(name, data.text);
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
