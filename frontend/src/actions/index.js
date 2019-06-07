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

export function changeToLogin(){
  return dispatch => {
    dispatch({
      type: UPDATEUSERVALUES,
      data: {
        login: false
      }
    });
  }
}

export function loginUser(email, password, history){
  return dispatch => {
    axios
    .post('http://localhost:8000/api/token/create', {
      email: email,
      password: password
    })
    .then((response) => {
      dispatch({
        type: UPDATEUSERVALUES,
        data: {
          access_token: response.data.auth_token,
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
      headers: { Authorization: "Token " + token }
    })
    .then((response) => {
      dispatch({
        type: UPDATEUSERVALUES,
        data: response.data
      })

      axios.get('http://localhost:8000/api/'+ response.data.id +'/balance', {
        headers: { Authorization: "Token " + token }
      })
      .then((balance_response) => {
        dispatch({
          type: UPDATEUSERVALUES,
          data: {
            balance: balance_response.data[0].money_balance
          }
        })
      })
      .catch((balance_error) => {
        console.log(balance_error.message)
      })

      axios.get('http://localhost:8000/api/'+ response.data.id +'/transfers', {
        headers: { Authorization: "Token " + token }
      })
      .then((transfers_response) => {
        dispatch({
          type: UPDATEUSERVALUES,
          data: {
            transfers: transfers_response.data
          }
        })
      })
      .catch((transfers_error) => {
        console.log(transfers_error.message)
      })

    })
    .catch((error) => {
      console.log(error.message)
    })
  }
}

export function getYourMoney(user){
  return dispatch => {
    axios
    .post('http://localhost:8000/api/'+ user.id +'/transfers',{
      rows: [
        {
          user: user.id,
          money_in: 1,
          money_out: 0
        }
      ],
      description: 'Te lo ganaste con tu trabajo, Felicidades!!'
    },{
      headers: { Authorization: "Token " + user.access_token }
    })
    .then((response)=> {
      dispatch({
        type: SNACKBAR_RESPONSE,
        data: {
          openSnackbar: true,
          snackBarResponse: 'Ganaste 1 punto, Felicidades!!'
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

export function getMyBalance(user, token){
  return dispatch => {
    if (user && token){
      axios.get('http://localhost:8000/api/'+ user +'/balance', {
        headers: { Authorization: "Token " + token }
      })
      .then((response) => {
        dispatch({
          type: UPDATEUSERVALUES,
          data: {
            balance: response.data[0].money_balance
          }
        })
      })
      .catch((error) => {
        console.log(error.message)
      });
    }
  }
}

export function getMyTransfers(user, token){
  return dispatch => {
    if (user && token){
      axios.get('http://localhost:8000/api/'+ user +'/transfers', {
        headers: { Authorization: "Token " + token }
      })
      .then((response) => {
        dispatch({
          type: UPDATEUSERVALUES,
          data: {
            transfers: response.data
          }
        })
      })
      .catch((error) => {
        console.log(error.message)
      });
    }
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
      headers: { Authorization: "Token " + from.access_token }
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
      headers: { Authorization: "Token " + token }
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