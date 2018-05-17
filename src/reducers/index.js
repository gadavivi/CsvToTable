import { combineReducers } from 'redux';
import LambdaListToTableReducer from './LambdaListToTableReducer';

const rootReducer = combineReducers({
  LambdaListTable : LambdaListToTableReducer
});

export default rootReducer;
