import {
    ACTION_LOAD_SEGMENTS_LIST_SAGA,
    ACTION_LOAD_SEGMENTS_LIST,
    ACTION_LEAVE_ANALYSE_PAGE,
    ACTION_FILTER_SEGMENT_LIST_SAGA,
    ACTION_DOWNLOAD_CUSTOMERS_SAGA
} from './Analyse.constants';
export const segmentLevels = ['Micro Segments', 'Segments', 'Macro Segments'];

export const actionSagaLoadSegmentsList = ( data ) => ({
    type: ACTION_LOAD_SEGMENTS_LIST_SAGA,
    payload: data || { level: 0 }
});

export const actionLoadAnalyseSegment = ( data ) => ({
    type: ACTION_LOAD_SEGMENTS_LIST,
    payload: data || -1
});

export const actionLeaveAnalysePage = () => ({
    type: ACTION_LEAVE_ANALYSE_PAGE
});

export const actionSagaFilterSegmentsList = ( data ) => ({
    type: ACTION_FILTER_SEGMENT_LIST_SAGA,
    payload: data
})

export const actionSagaDownloadCustomers = (data)=>({
    type: ACTION_DOWNLOAD_CUSTOMERS_SAGA,
    payload: data
})