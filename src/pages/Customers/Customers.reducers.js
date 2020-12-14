import {createReducerFromObject} from '../../utils';

import {
    ACTION_LOAD_CUSTOMERS_LIST,
    ACTION_LOAD_CONDENSED_SEGMENTS_LIST,
    ACTION_LEAVE_CUSTOMERS_PAGE
} from './Customers.constants';

export const initialState = {
    customer : [],
    segmentsList: [],
}

const reducerFunctions = {
    [ ACTION_LOAD_CUSTOMERS_LIST ]: (state, payload) => {
        return {
            ...state,
            customer : payload
        }
    },

    [ ACTION_LOAD_CONDENSED_SEGMENTS_LIST ]: (state, payload) => {
        return {
            ...state,
            segmentsList : payload
        }
    },
    [ ACTION_LEAVE_CUSTOMERS_PAGE ]: () => ({
            ...initialState
     })
};

const analysePageReducer = createReducerFromObject(reducerFunctions, initialState);

export default analysePageReducer;