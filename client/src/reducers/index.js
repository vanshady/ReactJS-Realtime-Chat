import { combineReducers } from 'redux';
import { SET_NAME, ADD_MESSAGE, CHANGE_NAME, ADD_USER, DELETE_USER  } from '../actions/message_actions';

export default function (initialState) {
  function setName(name = initialState.name, action) {
    if (action.type === SET_NAME || action.type === changeName) {
      return action.name;
    }

    return name;
  }

  function addMessage(messages = initialState.messages, action) {
    if (action.type === ADD_MESSAGE) {
      messages.map(message => Object.assign({}, message));
      messages.push(Object.assign({}, action.message));
      return messages;
    }

    return messages;
  }

  function changeName(users = initialState.users, action) {
    if (action.type === CHANGE_NAME) {
      const index = users.indexOf(action.oldName);
      return [
        ...users.slice(0, index),
        action.newName,
        ...users.slice(index + 1),
      ];
    }

    return users;
  }

  function changeUsers(users = initialState.users, action) {
    switch (action.type) {
      case ADD_USER:
        return [...users, action.name];
      case DELETE_USER:
        const index = users.indexOf(action.name);
        return [
          ...users.slice(0, index),
          ...users.slice(index + 1),
        ];
      default:
        return users;
    }
  }

  return combineReducers({ addMessage, changeName, changeUsers });
}
