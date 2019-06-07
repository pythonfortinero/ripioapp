import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import Login from './components/Login';
import Home from './components/Home';
import './css/index.css'
import { configureStore, history } from './reducers/configureStore';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)