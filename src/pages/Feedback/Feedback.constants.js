export const ACTION_LOAD_CUSTOMERS_SAGA = 'LOAD_SAGA_CUSTOMERS';
export const ACTION_LOAD_CUSTOMER_SAGA = 'LOAD_SAGA_CUSTOMER';

export const ACTION_LOAD_CUSTOMERS = 'LOAD_CUSTOMERS';
export const ACTION_LOAD_CUSTOMER = 'LOAD_CUSTOMER';
export const ACTION_LEAVE_FEEDBACK_PAGE = 'ACTION_LEAVE_FEEDBACK_PAGE';

export const ACTION_HIDE_LOADER = 'HIDE_LOADER';

export const LOAD_CUSTOMERS_PROFILE_DATA_SAGA = 'LOAD_CUSTOMERS_PROFILE_DATA_SAGA';
export const LOAD_CUSTOMERS_PROFILE_DATA = 'LOAD_CUSTOMERS_PROFILE_DATA';

export const url_load_customers = (dataset_id, segment_id) => `/datasets/${dataset_id}/segements/${segment_id}/customers`;
export const url_load_customer = (dataset_id, customerId) =>`/datasets/${dataset_id}/customers/${customerId}`;