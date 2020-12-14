import {takeLatest, takeEvery, call, put, fork} from 'redux-saga/effects';

import { request, cancelSaga } from '../../utils';
import { listener, unsubscribe } from './../../utils/request';

import {
  ACTION_DATASET_LISTENER_SAGA,
  ACTION_LOAD_DATASETS_SAGA,
  ACTION_UNSUBSCRIBE_DATASET_LISTENER_SAGA,
  ACTION_CHANGE_DATASET_ACTION_SAGA,
  ACTION_DELETE_DATASET_SAGA,
  ACTION_LEAVE_DATASETS_PAGE,
  URL_DATASETS_PROGRESS,
  url_datasets,
  URL_DATASETS_NEW,
  url_datasets_action
} from './Datasets.constants';

import {
  actionSetDatasets,
  actionUpdateDataset,
  actionDeleteDatasets} from './Datasets.actions';


var showDialog = function () {
  return { type: 'none'}
}

export function* getDatasets({payload = { } }) {
  try {
    let apiResponse = yield call(request(), url_datasets());
    yield put(actionSetDatasets(apiResponse));
    return apiResponse ;
  } catch (error) {
    yield put(showDialog({
      title: "Error",
      message: `Failed to delete model (${error})`,
      type: "DIALOG_TYPE_OK"
    }));
  }
}

export function* changeActionDatasets({payload}) {
    try {
        let {dataset_id, type} = payload;
        console.log(payload);
        var apiResponse = yield call(request("PUT"), url_datasets_action(dataset_id, type));
        yield put(actionUpdateDataset({...apiResponse, dataset_id}));
  } catch (error) {
    yield put(showDialog({
      title: "Error",
      message: `Failed to change action on model (${error})`,
      type: "DIALOG_TYPE_OK"
    }));
  }
}

export function* deleteDataset({payload = 0 }) {
  try {
    let {dataset_id, action} = payload;
    yield call(request("PUT"), url_datasets_action(dataset_id, action));
    yield put(actionDeleteDatasets(payload));

  } catch (error) {
    yield put(showDialog({
      title: "Error",
      message: `Failed to delete model (${error})`,
      type: "DIALOG_TYPE_OK"
    }));
  }
}

export function* datasetListener( { payload } ){
    console.log("datasetListener",payload);
    try {
        yield call(listener, payload.url, payload.cb , data => data);
    } catch (error) {
        yield put(showDialog({
            title: "Error",
            message: `Failed to subscribe model (${error})`,
            type: "DIALOG_TYPE_OK"
        }));
    }
}

export function* unsubscribeDatasetListener( payload ){
    try {
        yield call( unsubscribe );
    } catch (error) {
        yield put(showDialog({
            title: "Error",
            message: `Failed to unsubscribe model (${error})`,
            type: "DIALOG_TYPE_OK"
        }));
    }
}

function* datasetSaga() {
  let watcher = [];
  watcher[0] = yield fork(takeLatest, ACTION_LOAD_DATASETS_SAGA, getDatasets);
  watcher[1] = yield fork(takeLatest, ACTION_CHANGE_DATASET_ACTION_SAGA, changeActionDatasets);
  watcher[2] = yield fork(takeLatest, ACTION_DELETE_DATASET_SAGA, deleteDataset);
  watcher[3] = yield fork(takeEvery, ACTION_DATASET_LISTENER_SAGA, datasetListener );
  watcher[4] = yield fork(takeLatest, ACTION_UNSUBSCRIBE_DATASET_LISTENER_SAGA, unsubscribeDatasetListener );

  yield fork(takeLatest, ACTION_LEAVE_DATASETS_PAGE, cancelSaga, watcher);
}

export default [ datasetSaga ];