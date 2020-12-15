import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { loadToDoList } from './actions/actions';
import App from './containers/App/App';
import store from './store';
import createRoutes from './routes';
import './index.css';
import history from './history';

//store.dispatch(loadToDoList());

const target = document.querySelector('#root');

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: {onEnter: (nextState, replace)=> { replace("/datasets"); }},
    childRoutes: createRoutes(store)
  } ]
}

render(
  <Provider store={store}>
    <Router history={history} routes={rootRoute}>
    </Router>
  </Provider>,
  target,
);