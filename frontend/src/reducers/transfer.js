import {
  UPDATETRANSFERATTRIBUTES
} from '../constants';

const defaultTransfer = {
  namesSearched: []
};

const transfer = (state = defaultTransfer, action) => {
  switch(action.type){
  	case UPDATETRANSFERATTRIBUTES:
  		return Object.assign(state, action.data)
    default:
      return Object.assign({}, state);
  }
}

export default transfer;