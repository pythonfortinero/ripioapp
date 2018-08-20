import {
  UPDATEUSERVALUES,
  SNACKBAR_RESPONSE
} from '../constants';

const defaultUser = {};

const user = (state = defaultUser, action) => {
  switch(action.type){
  	case UPDATEUSERVALUES:
  		return Object.assign(state, action.data)
  	case SNACKBAR_RESPONSE:
  		return Object.assign(state, action.data)
    default:
      return Object.assign({}, state);
  }
}

export default user;