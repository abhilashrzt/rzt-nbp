import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];


if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composedEnhancers(applyMiddleware(sagaMiddleware)),
)


sagaMiddleware.run(rootSaga);

export default store;


/*
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
//import createReducer from './reducers';
import rootReducer from './reducers/rootReducer';


const sagaMiddleware = createSagaMiddleware();
const initialState = {
}
export default function configureStore(history) {
  const router = routerMiddleware(history);

  const enhancer = compose(
    applyMiddleware(sagaMiddleware, router),
    window.devToolsExtension && process.env.NODE_ENV === "development" ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, initialState, enhancer);

  store.runSaga = sagaMiddleware.run;
  // Async reducer registry
  store.asyncReducers = {};
  if (module.hot) {
    module.hot.accept();
  }
  return store;
}*/
