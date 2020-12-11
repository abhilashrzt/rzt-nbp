// ./src/actions/index.js

// ... ADD_TODO ...
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';
export const RENDER_TODO_LIST = 'RENDER_TODO_LIST';

// ... addToDo ...

export function loadToDoList() {
  return {
    type: LOAD_TODO_LIST
  };
}