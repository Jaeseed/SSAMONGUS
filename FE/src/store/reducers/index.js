import { combineReducers } from 'redux';
import account from './account';
import room from './room';

const rootReducer = combineReducers({
  account,
  room
});

export default rootReducer;
