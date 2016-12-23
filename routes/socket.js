const Message = require('./message');

// Keep track of which names are used so that there are no duplicates
const userNames = (() => {
  const names = {};

  const claim = (name) => {
    if (!name || names[name]) {
      return false;
    }

    names[name] = true;
    return true;
  };

  // find the lowest unused "guest" name and claim it
  const getGuestName = () => {
    let name;
    let nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  const get = () => {
    const res = [];
    for (const user in names) {
      if (user) {
        res.push(user);
      }
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
    get,
    getGuestName,
  };
})();

// export function for listening to the socket
module.exports = (socket) => {
  let name = userNames.getGuestName();
  const execCallback = (err, messages) => {
    if (err) {
      return console.log(err);
    }
    messages.sort((a, b) => {
      if (a._id > b._id) {
        return 1;
      }
      if (a._id < b._id) {
        return -1;
      }
      return 0;
    });
    // send the new user their name and a list of users
    socket.emit('init', {
      name,
      messages,
      users: userNames.get(),
    });
  };

  Message.find({}, (err) => {
    if (err) throw err;
  })
    .sort({ _id: -1 })
    .limit(100)
    .exec(execCallback);

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name,
  });

  // broadcast a user's message to other users
  socket.on('send:message', (data) => {
    const newMessage = new Message({
      user: name,
      text: data.text,
    });
    newMessage.save((err) => {
      if (err) console.log(err);
    });

    socket.broadcast.emit('send:message', {
      user: name,
      text: data.text,
    });
  });


  // validate a user's name change, and broadcast it on success
  socket.on('change:name', (data, fn) => {
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
  socket.on('disconnect', () => {
    socket.broadcast.emit('user:left', {
      name,
    });
    userNames.free(name);
  });
};
