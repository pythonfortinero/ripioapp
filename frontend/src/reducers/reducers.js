import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js';
import transfer from './transfer.js';

const reducer = combineReducers({user, transfer, router: routerReducer});
export default reducer;