import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as uiReducer} from 'redux-ui';
import datasetReducer from '../pages/Datasets/Datasets.reducers';
import globalReducer from '../pages/Global/Global.reducers';

export default function createReducer(asyncReducers) {
    const appReducer = combineReducers({
        // login: loginReducer,
        ui: uiReducer,
        routing: routerReducer,

        //TODO load slider async ?
        datasets: datasetReducer,
        global: globalReducer,
        //write synchronous reducers above this line
        ...asyncReducers
    });

    return (state, action) => {
        // if (action.type === ACTION_LOGOUT_SUCCESS || action.type === ACTION_CLEAR_STORE) {
        //     state = undefined;
        // }
        return appReducer(state, action)
    };

};
