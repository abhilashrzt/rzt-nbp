// ./src/reducers/index.js

// ... other imports ...

import { RENDER_TODO_LIST } from '../actions/actions';

// ... initialState ...
const initialState = {
    loader: {
      count: 0,
    },
    download: {
      progress: 0,
      visible: false,
    },
    errorPopup: {
      visible: false,
      msg: '',
      onSave: () => (null),
      onCancel: () => (null),
    },
    notification: {
      visible: false,
      msg: '',
      discardable: true,
      isClosed: false,
    },
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case RENDER_TODO_LIST:
      return {
        ...state,
        toDoList: action.toDoList,
      };
    // ... case ADD_TODO, and default ... :
    default:
      return state;
  }
}