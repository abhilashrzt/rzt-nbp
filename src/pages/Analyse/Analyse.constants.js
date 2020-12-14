import {queryGenerator} from './../../utils/index';
export const ACTION_LOAD_SEGMENTS_LIST_SAGA = 'LOAD_SAGA_SEGMENTS_LIST';
export const ACTION_LOAD_SEGMENTS_LIST = 'LOAD_SEGMENTS_LIST';
export const ACTION_LEAVE_ANALYSE_PAGE = 'LEAVE_ANALYSE_PAGE';
export const ACTION_DOWNLOAD_CUSTOMERS_SAGA = 'ACTION_DOWNLOAD_CUSTOMERS_SAGA';
export const ACTION_FILTER_SEGMENT_LIST_SAGA = 'FILTER_SAGE_SEGMENT_LIST';

export const url_analyse_segments = (datasetId, sortby)=>`/datasets/${datasetId}/segments${queryGenerator({sortby})}`;

/*TODO: remove the filter segments*/
// export const URL_FILTER_SEGMENTS = 'GET /segments/tabular/filter'; //Temporary
export const SEGMENTS_LEVELS = ['Macro Segments', 'Segments'];