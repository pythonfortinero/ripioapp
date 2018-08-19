import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import '../css/App.css';

class Login extends Component{

	render(){
		return(
			<MuiThemeProvider>
				<div className="login-containers">
					<h1 className="super-font big" >Transfer Free</h1>
            	</div>
			</MuiThemeProvider>
		)
	}
}

export default connect( state => state, {})(Login);