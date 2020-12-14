import {takeLatest, call, put, fork} from 'redux-saga/effects';
import {request, cancelSaga} from '../../utils';
import {
    ACTION_LOAD_SEGMENTS_LIST_SAGA,
    ACTION_LEAVE_ANALYSE_PAGE,
    ACTION_DOWNLOAD_CUSTOMERS_SAGA,
    url_analyse_segments
} from './Analyse.constants';
import { actionDownloadProgress } from '../Global/Global.actions';
import { downloadCustomers } from '../../utils/request';
import {
    actionLoadAnalyseSegment
} from './Analyse.actions';

var showDialog = function (...e) {
    console.error("error", e);
    return {type: 'none'}
};

function* loadAnalyseSegments({payload = {level: 0, dataset_id: 1 }}) {
    try {
        let {dataset_id, sortby} = payload;
        let apiResponse = yield call(request(), url_analyse_segments(dataset_id, sortby), payload, data => data);

        yield put(actionLoadAnalyseSegment(apiResponse));
        return apiResponse;

    } catch (error) {
        yield put(showDialog({
            title: "Error",
            message: `Failed to delete model (${error})`,
            type: "DIALOG_TYPE_OK"
        }));
    }
}

// function* getFilteredSegments(payload = {}) {
//     try {
//         let apiResponse = yield call(request, URL_FILTER_SEGMENTS, payload, data => data);
//         yield put(actionLoadAnalyseSegment(apiResponse));
//
//     } catch (error) {
//         yield put(showDialog({
//             title: "Error",
//             message: `Failed to delete model (${error})`,
//             type: "DIALOG_TYPE_OK"
//         }));
//     }
// }

function* prepareToDownload({payload}) {
    console.log(payload);
    let {dataset_id} = payload;
    downloadCustomers({ dataset_id });
    yield put(actionDownloadProgress({
        progress: 0,
        visible: true
    }));
}
function* customerSaga() {
    let watcher = [];
    watcher[0] = yield fork(takeLatest, ACTION_LOAD_SEGMENTS_LIST_SAGA, loadAnalyseSegments);
    watcher[1] = yield fork(takeLatest, ACTION_DOWNLOAD_CUSTOMERS_SAGA, prepareToDownload);
    // watcher[1] = yield fork(takeLatest, ACTION_FILTER_SEGMENT_LIST_SAGA, getFilteredSegments);
    yield fork(takeLatest, ACTION_LEAVE_ANALYSE_PAGE, cancelSaga, watcher);
}

export default [customerSaga];