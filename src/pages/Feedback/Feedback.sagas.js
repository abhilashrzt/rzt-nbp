import {takeLatest, call, put, fork} from 'redux-saga/effects';
import {request, cancelSaga} from '../../utils';
import {
    ACTION_LOAD_CUSTOMER_SAGA,
    ACTION_LEAVE_FEEDBACK_PAGE,
    url_load_customer
} from './Feedback.constants';
import { get } from 'lodash';

import { actionLoadCustomers, actionLoadCustomer } from './Feedback.actions';

export function* loadCustomer({payload={}}) {
    let params = payload;
    let {dataset_id, id} =payload;
    let customerData = yield call(request("GET"), url_load_customer(dataset_id, id), params, (data) => data);
    if (!customerData) return;
    let transactionHistory = customerData.transaction_history;
    yield put(actionLoadCustomer({ currentCustomer : { ...customerData, transactionHistory }}));
}

function* customerSaga() {
    let watcher = []
    watcher[0] = yield fork(takeLatest, ACTION_LOAD_CUSTOMER_SAGA, loadCustomer);
    yield fork(takeLatest, [ACTION_LEAVE_FEEDBACK_PAGE], cancelSaga, watcher);
}

export default [ customerSaga ];