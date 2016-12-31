import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import { chatMiddleware } from './chat';

const initialState = window.INITIAL_STATE;
const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers(initialState));
export default store;
