import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp from 'components/ChatApp.jsx';
import startChat from './chat';
import store from './store';

startChat(store);

ReactDOM.render(
  <Provider store={store}>
    <ChatApp />
  </Provider>
, document.getElementById('app'));
