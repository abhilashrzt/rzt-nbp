import {takeLatest, call, put, fork} from 'redux-saga/effects';
import {request, cancelSaga} from '../../utils';
import {
    ACTION_LEAVE_CUSTOMERS_PAGE,
    ACTION_LOAD_CUSTOMERS_LIST_SAGA,
    url_get_customers,
    url_get_condensed_segments_list,
    ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA
} from './Customers.constants';

import {
    actionLoadCustomersList,
    actionLoadCondensedSegmentsList
} from './Customers.actions';

var showDialog = function (...e) {
    console.error("error", e);
    return {type: 'none'}
}

function* loadCustomers({payload = {}}) {
    try {
        let {pagesize, pageno, dataset_id, sortby, segment_id} = payload;

        let apiResponse = yield call(request(), url_get_customers(dataset_id, segment_id, { pagesize, pageno, sortby }), payload, data => data);
        yield put(actionLoadCustomersList(apiResponse));
        return apiResponse;

    } catch (error) {
        yield put(showDialog({
            title: "Error",
            message: `(${error})`,
            type: "DIALOG_TYPE_OK"
        }));
    }
}

function* loadCondensedSegments({payload = {}}) {
    try {
        let {dataset_id, segment_id} = payload;
        let apiResponse = yield call(request(), url_get_condensed_segments_list(dataset_id, segment_id), payload, data => data);
        yield put(actionLoadCondensedSegmentsList(apiResponse));
        return apiResponse;

    } catch (error) {
        yield put(showDialog({
            title: "Error",
            message: `(${error})`,
            type: "DIALOG_TYPE_OK"
        }));
    }
}

function* customerSaga() {
    let watcher = [];
    watcher[0] = yield fork(takeLatest, ACTION_LOAD_CUSTOMERS_LIST_SAGA, loadCustomers);
    watcher[1] = yield fork(takeLatest, ACTION_LOAD_CONDENSED_SEGMENTS_LIST_SAGA, loadCondensedSegments);
    // watcher[1] = yield fork(takeLatest, ACTION_FILTER_SEGMENT_LIST_SAGA, getFilteredSegments);
    yield fork(takeLatest, ACTION_LEAVE_CUSTOMERS_PAGE, cancelSaga, watcher);
}

export default [customerSaga];