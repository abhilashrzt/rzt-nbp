// ./src/reducers/index.js

// ... other imports ...

import { RENDER_TODO_LIST } from '../actions/actions';

// ... initialState ...
const initialState = {};

export default function toDoApp(state = initialState, action) {
  switch (action.type) {
    case RENDER_TODO_LIST:
      return {
        ...state,
        toDoList: action.toDoList
      };
    // ... case ADD_TODO, and default ... :
    default: return {}
  }
}