import io from 'socket.io-client';
// import Cookies from 'jakobmattsson-client-cookies';
import * as actions from './actions/message';

let socket = null;

export function chatMiddleware(store) {
  return next => (action) => {
    if (socket) {
      if (action.type === actions.SEND_MESSAGE) {
        socket.emit('send:message', action.message);
      } else if (action.type === actions.CHANGE_NAME) {
        const newName = action.newName;

        // Cookies.set('name', newName);
        socket.emit('change:name', { newName });
      }
    }

    return next(action);
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('init', (data) => {
    const { users, messages, name } = data;
    // let newName = '';
    // if (store.getState().name) {
    //   newName = store.getState().name;
    // }
    store.dispatch(actions.init(users, messages, name));
  });
  socket.on('send:message', (message) => {
    store.dispatch(actions.addMessage(message));
  });
  socket.on('user:join', ({ name }) => {
    store.dispatch(actions.addUser(name));
  });
  socket.on('user:left', ({ name }) => {
    store.dispatch(actions.deleteUser(name));
  });
  socket.on('change:name', ({ oldName, newName }) => {
    store.dispatch(actions.othersChangeName(oldName, newName));
  });
}
