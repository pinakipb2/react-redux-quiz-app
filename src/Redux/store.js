import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer.js';

const middlewares = [];

let store;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
} else {
  store = createStore(rootReducer, applyMiddleware(...middlewares));
}

const persistor = persistStore(store);

export { store, persistor };
