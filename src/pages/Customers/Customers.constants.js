import {queryGenerator} from './../../utils/index';

export const ACTION_LOAD_CUSTOMERS_LIST_SAGA = 'LOAD_SAGA_CUSTOMERS_LIST';
export const ACTION_LOAD_CUSTOMERS_LIST = 'LOAD_CUSTOMERS_LIST';
export const ACTION_LEAVE_CUSTOMERS_PAGE = 'LEAVE_CUSTOMERS_PAGE';
export const ACTION_FILTER_SEGMENT_LIST_SAGA = 'FILTER_SAGE_SEGMENT_LIST';

export const url_get_customers= (dataset_id, segment_id, query) => `/datasets/${dataset_id}/segments/${segment_id}/customers${queryGenerator(query)}`;
export const url_get_condensed_segments_list = (dataset_id)=> `/datasets/${dataset_id}/segments/condensed`;

export const ACTION_LOAD_CONDENSED_SEGMENTS_LIST = 'ACTION_LOAD_CONDENSED_SEGMENTS_LIST';
export const ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA = 'ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA';