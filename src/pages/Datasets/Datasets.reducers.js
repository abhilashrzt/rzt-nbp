import {createReducerFromObject} from '../../utils';
import {
    ACTION_LOAD_DATASETS,
    ACTION_UPDATE_DATASET_PROGRESS,
    ACTION_UPDATE_DATASETS,
    ACTION_UPDATE_DATASET,
    ACTION_DELETE_DATASET,
    ACTION_LEAVE_DATASETS_PAGE,
    ACTION_DATASET_LISTENER
} from './Datasets.constants';

export const initialState = [];

const reducerFunctions = {
    ["action"]: (state, payload) => state,
    [ACTION_LOAD_DATASETS]: (state, payload) => {
        if (!payload) return state;
        return [
            ...payload
        ]
    },
    [ACTION_UPDATE_DATASET_PROGRESS]: (state, payload) => {
        if (!payload) return state;
        return state.map(dataset => {
            if (dataset.dataset_id != payload.dataset_id)
                return dataset;
            else {
                console.log("update", payload)
                return {
                    ...dataset,
                    status: {
                        meta: {
                            dataset_id: payload.dataset_id,
                            message: payload.meta.message,
                            progress: payload.meta.progress,
                            duration: payload.meta.duration,
                            completed_at: payload.meta.completed_at,
                            eta: payload.meta.eta,
                            msg_id: payload.meta.msg_id,
                            segments: payload.meta.segments,
                            gini_score: payload.meta.gini_score,
                            error: payload.error,
                        },
                        state: payload.state
                    }
                }
            }
        });
    },
    [ACTION_UPDATE_DATASETS]: (state, payload) => {
        if (!payload) return state;
        let interesetedDataset = state.find((dataset) => payload.dataset_id === dataset.dataset_id)

        if (interesetedDataset) {
            return state.map(dataset => {
                if (payload.dataset_id === dataset.dataset_id) return payload;
                return dataset;
            })
        }

        return [
            {
                ...payload
            },
            ...state
        ]
    },
    [ACTION_UPDATE_DATASET]: (state, payload) => {
        if (!payload) return state;
        return state.map(dataset => {
            if (dataset.dataset_id != payload.dataset_id)
                return dataset;
            else
                return {
                    ...dataset,
                    status: {
                        ...dataset.status,
                        dataset_id: payload.dataset_id,
                        meta: {
                            ...dataset.status.meta,
                            message: payload.message
                        }
                    },
                    toggle: true
                }
        })
    },
    [ACTION_DELETE_DATASET]: (state, payload) => {
        if (!payload) return state;
        return state.filter(dataset => (dataset.dataset_id != payload.dataset_id));
    },
    [ ACTION_LEAVE_DATASETS_PAGE ]: () => initialState

};


const datasetsPageReducer = createReducerFromObject(reducerFunctions, initialState);

export default datasetsPageReducer;