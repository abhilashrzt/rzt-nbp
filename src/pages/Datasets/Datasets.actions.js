import { ACTION_LOAD_DATASETS,
  ACTION_LOAD_DATASETS_SAGA,
  ACTION_UPDATE_DATASET,
  ACTION_UPDATE_DATASETS,
  ACTION_UPDATE_DATASET_PROGRESS,
  ACTION_UPDATE_DATASET_PROGRESS_SAGA,
  ACTION_CHANGE_DATASET_ACTION_SAGA,
  ACTION_REFRESH_DATASETS_SAGA,
  ACTION_DELETE_DATASET_SAGA,
  ACTION_DELETE_DATASET,
  ACTION_LEAVE_DATASETS_PAGE,
  ACTION_DATASET_LISTENER_SAGA,
  ACTION_UNSUBSCRIBE_DATASET_LISTENER_SAGA } from './Datasets.constants';

export const actionSagaDatasetListener = ( data ) => ({
    type: ACTION_DATASET_LISTENER_SAGA,
    payload: data
});

export const  actionSagaUnsubscribeDatasetListener = ( data ) => ({
  type: ACTION_UNSUBSCRIBE_DATASET_LISTENER_SAGA,
  payload: data
})

export const actionSagaLoadDatasets = (data)=>({
  type: ACTION_LOAD_DATASETS_SAGA,
  payload: data
});

export const actionSetDatasets = (data)=>({
  type: ACTION_LOAD_DATASETS,
  payload: data
});

export const actionSagaDatasetProgress = (data)=>({
  type: ACTION_UPDATE_DATASET_PROGRESS_SAGA,
  payload: data
});

export const actionUpdateDatasetProgress = (data)=>({
  type: ACTION_UPDATE_DATASET_PROGRESS,
  payload: data
});

export const actionUpdateDatasets = (data)=>({
  type: ACTION_UPDATE_DATASETS,
  payload: data
});

export const actionUpdateDataset = (data)=>({
  type: ACTION_UPDATE_DATASET,
  payload: data
});

export const actionSagaRefreshDatasets = (data)=>({
  type: ACTION_REFRESH_DATASETS_SAGA,
  payload: data
});

export const actionChangeDatasetAction = (data)=>({
  type: ACTION_CHANGE_DATASET_ACTION_SAGA,
  payload: data
});

export const actionDeleteDatasets = (data) => ({
  type: ACTION_DELETE_DATASET,
  payload: data
});

export const actionDeleteDatasetsSaga = (payload)=>({
    type: ACTION_CHANGE_DATASET_ACTION_SAGA,
    payload
})

export const actionUpdateDatasetsProgressSaga =(payload) => ({
    type: ACTION_UPDATE_DATASET_PROGRESS_SAGA,
    payload
})

export const actionLeaveDatasetsPage = () => ({
    type: ACTION_LEAVE_DATASETS_PAGE
});
