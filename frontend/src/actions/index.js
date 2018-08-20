import {
  UPDATEUSERVALUES,
  SNACKBAR_RESPONSE,
  UPDATETRANSFERATTRIBUTES
} from '../constants';
import axios from 'axios';

export const objectToArray = function(obj){
  return Object.keys(obj).map(function(key) {
    return Object.assign({id: key}, obj[key]);
  });
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function updateLoginPasswordValue(value){
  return dispatch => {
    dispatch({
      type: UPDATEUSERVALUES,
      data: {
        loginpassword: value
      }
    })
  }
}

export function updateLoginEmailValue(value){
  return dispatch => {
    dispatch({
      type: UPDATEUSERVALUES,
      data: {
        loginemail: value
      }
    })
  }
}

export function updateSignUpPasswordValue(value){
  return dispatch => {
    dispatch({
      type: UPDATEUSERVALUES,
      data: {
        signuppassword: value
      }
    })
  }
}

export function updateSignUpEmailValue(value){
  return dispatch => {
    dispatch({
      type: UPDATEUSERVALUES,
      data: {
        signupemail: value
      }
    })
  }
}

//{ headers: { Authorization: "Bearer " + this.state.access_token } }
export function signUpUser(email, password){
  return dispatch => {
    axios
    .post('http://localhost:8000/api/users/create', {
      email: email,
      password: password
    })
    .then((response) => {
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: 'Usuario creado con exito'
        }
      })
    })
    .catch((error) => {
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: error.message
        }
      })
    });
  }
}

export function closeSnackbar(){
  return dispatch => {
    dispatch({
      type: SNACKBAR_RESPONSE,
      data: {
        openSnackbar: false,
        snackBarResponse: ''
      }
    })
  }
}

export function loginUser(email, password, history){
  return dispatch => {
    axios
    .post('http://localhost:8000/api/jwt/create', {
      email: email,
      password: password
    })
    .then((response) => {
      dispatch({
        type: UPDATEUSERVALUES,
        data: {
          access_token: response.data.token,
          login: true
        }
      });
      history.push('/');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}

export function getMyData(token){
  return dispatch => {
    axios.get('http://localhost:8000/api/me', {
      headers: { Authorization: "JWT " + token }
    })
    .then((response) => {
      debugger
      dispatch({
        type: UPDATEUSERVALUES,
        data: response.data
      })
    })
    .catch((error) => {
      console.log(error.message)
    })
  }
}

export function updateToEmailTransfer(value){
  return dispatch => {
    dispatch({
      type: UPDATETRANSFERATTRIBUTES,
      data: {
        to_email: value
      }
    })
  }
}

export function updateToAmountTransfer(value){
  return dispatch => {
    dispatch({
      type: UPDATETRANSFERATTRIBUTES,
      data: {
        to_amount: value
      }
    })
  }
}

export function updateDescriptionTransfer(value){
  return dispatch => {
    dispatch({
      type: UPDATETRANSFERATTRIBUTES,
      data: {
        description: value
      }
    })
  }
}

export function updateToIdTransfer(value){
  return dispatch => {
    dispatch({
      type: UPDATETRANSFERATTRIBUTES,
      data: {
        to_id: value
      }
    })
  }
}

export function makeTransfer(to, from){
  return dispatch => {
    debugger
    axios
    .post('http://localhost:8000/api/'+ from.id +'/transfers',{
      rows: [
        {
          user: from.id,
          money_in: 0,
          money_out: to.to_amount
        },
        {
          user: to.to_id,
          money_in: to.to_amount,
          money_out: 0
        }
      ],
      description: to.description
    },{
      headers: { Authorization: "JWT " + from.access_token }
    })
    .then((response)=> {
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: 'transferencia realizada con exito'
        }
      })
      dispatch({
        type: UPDATETRANSFERATTRIBUTES,
        data: {
          description: '',
          to_id: '',
          to_email: '',
          to_amount: ''
        }
      })
      console.log('transferencia realizada')
    })
    .catch((error) => {
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: 'Error al realizar la transferencia'
        }
      })
    })
  }
}

export function searchName(token, value){
  return dispatch => {
    axios
    .get('http://localhost:8000/api/search_mail?email=' + value,
    {
      headers: { Authorization: "JWT " + token }
    })
    .then((response)=> {
      dispatch({
        type: UPDATETRANSFERATTRIBUTES,
        data: {
          namesSearched: response.data
        }
      });
    })
    .catch((error)=> {
      console.log(error.message)
    })
  }
}