import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp from 'components/ChatApp.jsx';
import { createStore, applyMiddleware } from 'redux';
import startChat, { chatMiddleware } from './chat';
import reducers from './reducers/index';

const preloadedState = JSON.parse(window.__PRELOADED_STATE__);
const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, preloadedState);

startChat(store);

ReactDOM.render(
  <Provider store={store}>
    <ChatApp />
  </Provider>
, document.getElementById('app'));
