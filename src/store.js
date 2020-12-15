import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const initialState = {
}
export default function configureStore(history) {
    const router = routerMiddleware(history);

    const enhancer = compose(
        applyMiddleware(sagaMiddleware, router),
        window.devToolsExtension && process.env.NODE_ENV === "development" ? window.devToolsExtension() : f => f
    );

    const store = createStore(createReducer(), initialState, enhancer);

    store.runSaga = sagaMiddleware.run;
    // Async reducer registry
    store.asyncReducers = {};
    if (module.hot) {
        module.hot.accept();
    }
    return store;
}