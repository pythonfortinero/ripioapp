import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import '../css/App.css';
import {
	updateLoginPasswordValue,
	updateLoginEmailValue,
	loginUser,
	updateSignUpPasswordValue,
	updateSignUpEmailValue,
	signUpUser,
	closeSnackbar
} from '../actions';

class Login extends Component{

	login = () => {
		this.props.loginUser(
			this.props.user.loginemail,
			this.props.user.loginpassword,
			this.props.history
		)
	}

	signUp = () => {
		this.props.signUpUser(
			this.props.user.signupemail,
			this.props.user.signuppassword
		)
	}

	render(){
		return(
			<MuiThemeProvider>
				<div className="login-containers">
					<h1 className="super-font big" >Transfer Free</h1>
					<Paper  zDepth={2} >
	              		<Tabs >
			              <Tab label="Ingresar" >
			                <div>
			                  <TextField
			                    floatingLabelText="Email"
			                    type="email"
			                    onChange={(e) => this.props.updateLoginEmailValue(e.target.value)}
			                    fullWidth={true}
			                    value={this.props.user.loginemail}
			                  />
			                  <br />
			                  <TextField
			                    floatingLabelText="Contraseña"
			                    type="password"
			                    onChange={(e) => this.props.updateLoginPasswordValue(e.target.value)}
			                    fullWidth={true}
			                    value={this.props.user.loginpassword}
			                  />
			                  <br />
			                  <RaisedButton 
			                    label="Ingresar"  
			                    fullWidth={true}
			                    onClick={ this.login }
			                  />
			                </div>
			              </Tab>
			              <Tab label="Registrarse" >
			                <div>
			                  <TextField
			                    floatingLabelText="Email"
			                    onChange={(e) => this.props.updateSignUpEmailValue(e.target.value)}
			                    type="email"
			                    fullWidth={true}
			                    value={this.props.user.signupemail}
			                  />
			                  <br />
			                  <TextField
			                    floatingLabelText="Contraseña"
			                    onChange={(e) => this.props.updateSignUpPasswordValue(e.target.value)}
			                    type="password"
			                    fullWidth={true}
			                    value={this.props.user.signuppassword}
			                  />
			                  <br />
			                  <RaisedButton 
			                    label="Aceptar" 
			                    fullWidth={true}
			                    onClick={ this.signUp }
			                  />
			                </div>
			              </Tab>
	            		</Tabs>  
            		</Paper>
            		<Snackbar
              			open={this.props.user.openSnackbar}
          				message={this.props.user.snackBarResponse}
          				autoHideDuration={4000}
          				onRequestClose={this.props.closeSnackbar}
        			/>
            	</div>
			</MuiThemeProvider>
		)
	}
}

export default connect( state => state, {
	updateLoginPasswordValue,
	updateLoginEmailValue,
	loginUser,
	updateSignUpPasswordValue,
	updateSignUpEmailValue,
	signUpUser,
	closeSnackbar
})(Login);