import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Transfers from './Transfers';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  getMyData
} from '../actions';
import '../css/App.css';


class Home extends Component{

  componentWillMount(){
    if (this.props.user.login === false)
      this.props.history.replace('/login');
    else{
      this.props.getMyData(this.props.user.access_token)
    }
  }

  render(){
    return (
      <MuiThemeProvider>
        <div>
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
                      nestedItems={ item.rows.map((row, index) => <ListItem 
                        key={row.index } 
                        primaryText={row.user} 
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
        </div>
      </MuiThemeProvider>
    );  
  }
} 

export default connect( state => state, {
  getMyData
})(Home);