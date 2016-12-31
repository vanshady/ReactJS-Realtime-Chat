import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import { chatMiddleware } from './chat';

const preloadedState = JSON.parse(window.__PRELOADED_STATE__);
const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers(preloadedState));
export default store;
