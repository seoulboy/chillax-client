import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';
import soundsReducer from './soundsReducer';

export default combineReducers({
  userReducer,
  playerReducer,
  soundsReducer,
});
