import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { loadToDoList } from './actions/actions';
import rootReducer from './reducers/rootReducer';
import App from './containers/App/App';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import { BrowserRouter } from 'react-router-dom';
//import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.dispatch(loadToDoList());

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  target,
);