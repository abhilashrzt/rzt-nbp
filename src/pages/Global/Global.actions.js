import { ACTION_LOADER_INCREMENT_COUNT,
    ACTION_LOADER_DECREMENT_COUNT,
    ACTION_SHOW_NOTIFICATION_BAR,
    ACTION_HIDE_NOTIFICATION_BAR,
    ACTION_TOGGLE_POPUP,
    ACTION_LOADER_RESET_COUNT,
    ACTION_DOWNLOAD_PROGRESS
} from './Global.constants';

export const actionLoaderIncrementCount = (data) => ({
  type: ACTION_LOADER_INCREMENT_COUNT,
  payload: data
});

export const actionLoaderDecrementCount = (data) => ({
  type: ACTION_LOADER_DECREMENT_COUNT,
  payload: data
});

export const actionTogglePopup = ( data ) => ({
  type: ACTION_TOGGLE_POPUP,
  payload: data
});

export const actionLoaderResetCount = (data) => ({
    type: ACTION_LOADER_RESET_COUNT,
    payload: data
});

export const actionShowNotificationBar = (data) => ({
    type: ACTION_SHOW_NOTIFICATION_BAR,
    payload: data
});

export const actionHideNotificationBar = (data) => ({
    type: ACTION_HIDE_NOTIFICATION_BAR,
    payload: data || {}
});
export const actionDownloadProgress = (data) => ({
    type: ACTION_DOWNLOAD_PROGRESS,
    payload: data || {}
})