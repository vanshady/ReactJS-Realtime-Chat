import store from '../store';

export const ADD_MESSAGE = 'add-message';
export const ADD_USER = 'add-user';
export const SET_NAME = 'set-name';
export const SET_MESSAGES = 'set-messages';
export const SET_USERS = 'set-users';
export const SEND_MESSAGE = 'send-message';
export const DELETE_USER = 'delete-user';
export const CHANGE_NAME = 'change-name';
export const OTHERS_CHANGE_NAME = 'others-change-name';

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}

export function sendMessage(message) {
  return { type: SEND_MESSAGE, message };
}

export function addUser(user) {
  return { type: ADD_USER, user };
}

export function deleteUser(user) {
  return { type: DELETE_USER, user };
}

export function changeName(name) {
  return { type: CHANGE_NAME, oldName: store.getState().name, newName: name };
}

export function othersChangeName(oldName, newName) {
  return { type: OTHERS_CHANGE_NAME, oldName, newName };
}
