import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'

export const history = createHistory()
const routers = routerMiddleware(history)

export const configureStore = () => {
  const storeWithMiddlewares = applyMiddleware(
    thunk,
    promise,
    routers,
    createLogger(),
  );
  return createStore(reducers, storeWithMiddlewares);
};
