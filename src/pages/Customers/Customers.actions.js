import {
    ACTION_LOAD_CUSTOMERS_LIST_SAGA,
    ACTION_LOAD_CUSTOMERS_LIST,
    ACTION_LEAVE_CUSTOMERS_PAGE,
    ACTION_LOAD_CONDENSED_SEGMENTS_LIST,
    ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA
} from './Customers.constants';

export const segmentLevels = ['Micro Segments', 'Segments', 'Macro Segments'];

export const actionSagaLoadCustomersList = ( data ) => ({
    type: ACTION_LOAD_CUSTOMERS_LIST_SAGA,
    payload: data || { level: 0 }
});

export const actionLoadCustomersList = ( data ) => ({
    type: ACTION_LOAD_CUSTOMERS_LIST,
    payload: data || -1
});

export const actionLeaveCustomersPage = () => ({
    type: ACTION_LEAVE_CUSTOMERS_PAGE
});

export const actionLoadCondensedSegmentsList = ( data ) => ({
    type: ACTION_LOAD_CONDENSED_SEGMENTS_LIST,
    payload: data || -1
})

export const actionSagaLoadCondensedSegmentsList = ( data ) => ({
    type: ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA,
    payload: data || -1
})