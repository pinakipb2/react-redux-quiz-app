import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import playerReducer from './player/player.reducer.js';
import localforage from 'localforage';

const persistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: ['player'],
};

const rootReducer = combineReducers({
  player: playerReducer,
});

export default persistReducer(persistConfig, rootReducer);
