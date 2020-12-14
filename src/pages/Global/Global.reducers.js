import {createReducerFromObject} from '../../utils';
import {
    ACTION_LOADER_INCREMENT_COUNT,
    ACTION_LOADER_DECREMENT_COUNT,
    ACTION_SHOW_NOTIFICATION_BAR,
    ACTION_HIDE_NOTIFICATION_BAR,
    ACTION_TOGGLE_POPUP,
    ACTION_LOADER_RESET_COUNT,
    ACTION_DOWNLOAD_PROGRESS
} from './Global.constants';

export const initialState = {
    loader: {
        count: 0
    },
    download: {
        progress: 0,
        visible: false
    },
    errorPopup: {
        visible: false,
        msg: "",
        onSave: () => ( null ),
        onCancel: () => ( null )
    },
    notification: {
        visible: false,
        msg: "",
        discardable: true,
        isClosed: false
    }
};

const reducerFunctions = {
    ["action"]: (state, payload) => state,
    [ACTION_LOADER_INCREMENT_COUNT]: (state, payload) => {
      return {
        ...state,
        loader: {
          count : state.loader.count + 1
        }
    }},
    [ACTION_LOADER_DECREMENT_COUNT]: (state, payload) => {
      return {
        ...state,
        loader: {
        count : state.loader.count - 1 < 0 ? 0: state.loader.count - 1
      }
    }},
    [ACTION_LOADER_RESET_COUNT]: (state)=>({
        ...state,
        loader: {
            count : 0
        }
    }),
    [ACTION_SHOW_NOTIFICATION_BAR]: (state, payload) => ({
        ...state,
        notification: {
            visible: payload.visible || false,
            msg: payload.msg || '',
            discardable: payload.discardable || true,
            isClosed: payload.isClosed || false,
            type: payload.type || ''
        },
    }),
    [ACTION_HIDE_NOTIFICATION_BAR]: (state, payload) => ({
        ...state,
        notification: {
            visible: false,
            msg: "",
            isClosed: payload.isClosed || false
        },
    }),

    [ ACTION_TOGGLE_POPUP ] : (state, payload) => {
      if(state.errorPopup.visible)
        return {
          ...state,
          errorPopup : !state.errorPopup.visible
        }
      else
        return {
          ...state,
          errorPopup : {
            visible : !state.errorPopup.visible,
              msg : payload.msg,
            onSave : payload.onSave,
            onCancel : payload.onCancel
          }
        }
    },
    [ACTION_DOWNLOAD_PROGRESS]:(state, payload)=>{
        if (!payload) return payload;
        return {
            ...state,
            download: payload
        }
    }
  };


const reducer = createReducerFromObject(reducerFunctions, initialState);

export default reducer;