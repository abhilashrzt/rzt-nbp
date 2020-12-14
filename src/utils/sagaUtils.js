/**
 * Custom functions to aid the usage of redux-saga
 */

/**
 * Function for cancelling a task
 */

import {cancel} from 'redux-saga/effects';

export function* cancelSaga (task) {
    console.log("cancelSaga", task)
    if(Array.isArray(task))
        for(let i=0; i<task.length; i++)
            yield cancel(task[i]);
    else
        yield cancel(task);
}