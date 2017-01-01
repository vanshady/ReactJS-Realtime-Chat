import { INIT, SET_NAME, ADD_MESSAGE, SEND_MESSAGE, CHANGE_NAME,
  OTHERS_CHANGE_NAME, ADD_USER, DELETE_USER } from '../actions/message.js';

function changeUser(users, oldName, newName) {
  const index = users.indexOf(oldName);
  return [
    ...users.slice(0, index),
    newName,
    ...users.slice(index + 1),
  ];
}

function deleteUser(users, name) {
  const index = users.indexOf(name);
  return [
    ...users.slice(0, index),
    ...users.slice(index + 1),
  ];
}

export default function reducer(state = { name: '', users: [], messages: [] }, action) {
  if (!action) return { ...state };

  switch (action.type) {
    case INIT:
      return { name: action.name, users: action.users, messages: action.messages };
    case SET_NAME:
      return { ...state, name: action.name };
    case ADD_MESSAGE:
    case SEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    case CHANGE_NAME:
      return { ...state,
        name: action.newName,
        users: changeUser(state.users, action.oldName, action.newName) };
    case OTHERS_CHANGE_NAME:
      return { ...state, users: changeUser(state.users, action.oldName, action.newName) };
    case ADD_USER:
      return { ...state, users: [...state.users, action.user] };
    case DELETE_USER:
      return { ...state, users: deleteUser(state.users, action.user) };
    default:
      return state;
  }
}
