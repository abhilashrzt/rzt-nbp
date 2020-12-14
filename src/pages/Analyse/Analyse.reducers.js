import {createReducerFromObject} from '../../utils';

import {
    ACTION_LOAD_SEGMENTS_LIST,
    ACTION_LEAVE_ANALYSE_PAGE
} from './Analyse.constants';

export const initialState = {
    segments : []
}

const reducerFunctions = {
    [ ACTION_LOAD_SEGMENTS_LIST ]: (state, payload) => ({
        segments : payload
    }),
     [ ACTION_LEAVE_ANALYSE_PAGE ]: () => initialState
};

const analysePageReducer = createReducerFromObject(reducerFunctions, initialState);

export default analysePageReducer;