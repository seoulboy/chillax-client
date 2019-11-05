import { combineReducers } from 'redux';
import userReducer from './userReducer';
import soundReducer from './soundReducer';

export default combineReducers({
  userReducer,
  soundReducer,
});
