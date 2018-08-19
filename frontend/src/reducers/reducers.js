import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user.js';

const reducer = combineReducers({user, router: routerReducer});
export default reducer;