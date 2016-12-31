import { combineReducers } from 'redux';
import { SET_NAME, SET_MESSAGES, SET_USERS, ADD_MESSAGE, CHANGE_NAME,
  ADD_USER, DELETE_USER, SEND_MESSAGE, OTHERS_CHANGE_NAME } from 'actions/message';

export default function (initialState) {
  function setName(name = initialState.name, action) {
    if (action.type === SET_NAME || action.type === CHANGE_NAME) {
      return action.name;
    }

    return name;
  }

  function setMessages(messages = initialState.messages, action) {
    if (action.type === SET_MESSAGES) {
      return action.messages;
    }

    return messages;
  }

  function setUsers(users = initialState.users, action) {
    if (action.type === SET_USERS) {
      return action.users;
    }

    return users;
  }

  function addMessage(messages = initialState.messages, action) {
    if (action.type === ADD_MESSAGE || action.type === SEND_MESSAGE) {
      messages.map(message => Object.assign({}, message));
      messages.push(Object.assign({}, action.message));
      return messages;
    }

    return messages;
  }

  function changeName(users = initialState.users, action) {
    if (action.type === CHANGE_NAME ||
      action.type === OTHERS_CHANGE_NAME) {
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

  return combineReducers({ setName, setMessages, setUsers, addMessage, changeName, changeUsers });
}
