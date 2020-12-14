import {createReducerFromObject} from '../../utils';

import {ACTION_LEAVE_FEEDBACK_PAGE,
    LOAD_CUSTOMERS_PROFILE_DATA,
    ACTION_LOAD_CUSTOMERS,
    ACTION_LOAD_CUSTOMER,
    ACTION_LOAD_CUSTOMERS_SAGA,
    ACTION_HIDE_LOADER,
    ACTION_LOAD_CUSTOMER_SAGA} from './Feedback.constants';

export const initialState = {
    customerList: {},
    currentCustomer: {
        profile: []
    }
}

const reducerFunctions = {
    [ACTION_LOAD_CUSTOMER_SAGA]: (state) => {
        return {
            ...state
        }
    },
    [ACTION_LOAD_CUSTOMERS_SAGA]: (state) => {
        return {
            ...state
        }
    },
    [ACTION_LOAD_CUSTOMERS] : (state = initialState, payload) => {
        if(!payload) return state;
        return {
          ...state,
            customerList: payload.customerList
        };
    },

    [ACTION_LOAD_CUSTOMER] : (state, payload) => {
        if(!payload) return state;
        return {
            ...state,
            currentCustomer: payload.currentCustomer
        };
    },
    [ ACTION_LEAVE_FEEDBACK_PAGE ]: () => ({
            ...initialState
    })
};


const customerPageReducer = createReducerFromObject(reducerFunctions, initialState);

export default customerPageReducer;