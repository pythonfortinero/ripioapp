import {
  LOGIN_USER
} from '../constants';

const defaultUser = {
  login: false, 
};

const user = (state = defaultUser, action) => {
  switch(action.type){
  	case LOGIN_USER:
  		return Object.assign(state, {login: action.status});
    default:
      return Object.assign({}, state);
  }
}

export default user;