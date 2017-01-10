const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient('6379', 'redis');
// const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (err) => {
  console.log('Error ' + err);
});

const removeName = (name) => {
  if (name.substr(0, 5) === 'Guest') {
    client.multi()
      .lrem('chatroom:public:users', 1, name)
      .decr('guest_num')
      .execAsync();
  } else {
    client.multi()
      .lrem('chatroom:public:users', 1, name)
      .execAsync();
  }
};

const changeName = (oldName, newName) => {
  client.multi()
  .lrem(['chatroom:public:users', 1, oldName])
  .rpush(['chatroom:public:users', newName])
  .execAsync();
};

const decrGuest = () => {
  client.multi().decr('guest_num').execAsync();
};

// export function for listening to the socket
module.exports = (socket) => {
  client.multi().incr('guest_num').execAsync()
  .then(num => client.multi()
    .rpush('chatroom:public:users', `Guest ${num}`)
    .lrange('chatroom:public:users', 0, -1)
    .execAsync()
    .then(replies => ({
      paramName: `Guest ${num}`,
      paramUsers: replies[1],
    })))
  .then((res) => {
    const { paramName, paramUsers } = res;
    let name = paramName;
    const users = paramUsers;

    // send the new user their name and a list of users
    socket.emit('init', {
      name,
      users,
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
      name,
    });

    // broadcast a user's message to other users
    socket.on('send:message', (data) => {
      const newMessage = {
        user: name,
        text: data.text,
      };
      client.rpush('chatroom:public:messages', JSON.stringify(newMessage));

      socket.broadcast.emit('send:message', newMessage);
    });

    // validate a user's name change, and broadcast it on success
    socket.on('change:name', (data) => {
      const oldName = name;
      const newName = data.newName;
      if (oldName.substr(0, 5) === 'Guest') {
        decrGuest();
      }

      changeName(oldName, newName);
      name = newName;

      socket.broadcast.emit('change:name', {
        oldName,
        newName,
      });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', () => {
      socket.broadcast.emit('user:left', {
        name,
      });
      removeName(name);
    });
  });
};
