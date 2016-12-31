import * as actions from 'actions/message-actions';
import io from 'socket.io-client';
import Cookies from 'jakobmattsson-client-cookies';

let socket = null;

export function chatMiddleware(store) {
  return next => (action) => {
    if (socket) {
      if (action.type === actions.SEND_MESSAGE) {
        socket.emit('send:message', action.message);
      } else if (action.type === actions.CHANGE_NAME) {
        const { newName } = actions;

        Cookies.set('name', newName);
        socket.emit('change:name', { name: newName });
      }
    }

    return next(action);
  };
}

function initialize(data) {
  const { users, messages, name } = data;
  if (this.state.user) {
    this.setState({ users, messages });
  } else {
    this.setState({ users, messages, user: name });
  }
}

// function messageRecieve(message) {
  // const { messages } = this.state;
  // messages.push(message);
  // this.setState({ messages, scrollTop: document.getElementById('messageList').scrollHeight });
// }

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('init', initialize);
  socket.on('send:message', (message) => {
    store.dispatch(actions.addMessage(message));
  });
  socket.on('user:join', (name) => {
    store.dispatch(actions.addUser(name));
  });
  socket.on('user:left', (name) => {
    store.dispatch(actions.deleteUser(name));
  });
  socket.on('change:name', (name) => {
    store.dispatch(actions.changeName(name));
  });
}
