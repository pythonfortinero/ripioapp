import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Transfers from './Transfers';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  getMyData,
  changeToLogin
} from '../actions';
import '../css/App.css';


class Home extends Component{

  constructor(props){
    super(props);
    this.state = { drawer: false };
  }

  componentWillMount(){
    if (this.props.user.login === false)
      this.props.history.replace('/login');
    else{
      this.props.getMyData(this.props.user.access_token)
    }
  }

  openDrawer = () => this.setState({drawer: true});

  closeDrawer = (open) => {
    this.setState({drawer: false});
  }

  logOut = () => {
    this.props.changeToLogin()
    this.props.history.push('/login');
  }


  render(){
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            title="Ripio test" 
            onLeftIconButtonTouchTap={ this.openDrawer }
          />
          <Tabs>
            <Tab label="Balance" >
              <div>
                <h2>Saldo</h2>
                <p>
                  tu saldo actual es:
                </p>
                <h3>
                  {this.props.user.balance}
                </h3>
              </div>
            </Tab>
            <Tab label="Mis transferencias" >
              <div>
                <h2>Mis transferencias</h2>
                <p>
                  listado de todas de transferencias 
                </p>
                <List>
                  {(this.props.user.transfers && this.props.user.transfers.length) 
                    && this.props.user.transfers.map((item)=> {
                    return <ListItem 
                      key = { item.id }
                      primaryText={item.description}
                      secondaryText={item.timestamp}
                      initiallyOpen={false}
                      primaryTogglesNestedList={true}
                      nestedItems={ item.rows
                        .filter((row) => {
                          return row.user === this.props.user.id
                        })
                        .map((row, index) => <ListItem 
                        key={row.index } 
                        primaryText={"Entrada: " + row.money_in + " Salida: " + row.money_out} 
                      />) }
                    />
                  })}
                </List>
              </div>
            </Tab>
            <Tab
              label="Nueva transferencia"
              //onActive={handleActive}
            >
              <Transfers />
            </Tab>
          </Tabs>
          <Drawer open={this.state.drawer} docked={false} onRequestChange={this.closeDrawer} >
            <MenuItem onClick={ this.logOut }>Cerrar sesion</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );  
  }
} 

export default connect( state => state, {
  getMyData,
  changeToLogin
})(Home);