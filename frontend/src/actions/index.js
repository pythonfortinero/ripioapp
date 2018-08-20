import {
  UPDATEUSERVALUES,
  SNACKBAR_RESPONSE
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
    debugger
    axios
    .post('http://localhost:8000/api/users/create', {
      email: email,
      password: password
    })
    .then((response) => {
      debugger
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: 'Usuario creado con exito'
        }
      })
    })
    .catch((error) => {
      debugger
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
    debugger
    axios
    .post('http://localhost:8000/api/jwt/create', {
      email: email,
      password: password
    })
    .then((response) => {
      debugger
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
      debugger
      console.log(error);
    });
  }
}