import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import '../css/App.css';

class Home extends Component{

	render(){
		return(
			<MuiThemeProvider>
				<div>
					<h1>Hola</h1>
				</div>
			</MuiThemeProvider>
		)
	}
}


export default connect( state => state, {})(Home);
