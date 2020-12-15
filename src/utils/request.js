import store from '../store';
import _ from 'underscore';

import { URL_STOMP } from './../pages/Global/Global.constants';

import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

import {
    actionShowNotificationBar,
    actionHideNotificationBar,
    actionLoaderIncrementCount,
    actionLoaderDecrementCount,
    actionLoaderResetCount
} from '../pages/Global/Global.actions';

/**
 * Returns a reducer function
 * @param reducerFunctions {object} an object where keys are action types and values are functions
 * @param initialState {*}
 * @returns {function(*=, {type: *, payload: *}): *}
 */

const notifyError = (e)=>{
    store.dispatch(actionLoaderResetCount());
    setTimeout(function () {
        store.dispatch(actionHideNotificationBar());
    }, 4000);
    store.dispatch(actionShowNotificationBar({visible: true, msg: e.message || e.status || e, type: 'error'}));
}
export const request = (method = "GET")=>function(command) {
    console.info('In Request');
    store.dispatch(actionLoaderIncrementCount());

    return fetch(`/rest${command}`, { method })
        .then(response=>{
            if(response.ok) return response;
            let errorStatus = response.statusText;

            throw response.json().then(i=>{
                return (i && i.message) || errorStatus || i;
            });
        })
        .then(response=>response.json())
        .then(response => {

            console.info("response ", response)
            store.dispatch(actionLoaderDecrementCount());
            return response;

        })
        .catch(error=>{
            if (error && error.then)
                return error.then(function (e) {
                    notifyError(e)
                })
            notifyError(error)
            return;
        })
};



var ws, client, subscriptions = [], timeout;

const getClient = function(){
    if (!client){
        ws = new SockJS(URL_STOMP);
        client = Stomp.over(ws);
        client.connect({},
            onConnect,
            onConnectionError)
    }
    client.heartbeat.outgoing = 20000; // client will send heartbeats every 20000ms
    client.heartbeat.incoming = 0;
    return client;
};

const onConnect = () => {

    store.dispatch(actionShowNotificationBar({visible: true, msg: "Connected", discardable: true}));
    setTimeout(function () {
        store.dispatch(actionHideNotificationBar());
    }, 2000);

    subscribeAll();
};

const onConnectionError = () => {
    store.dispatch(actionLoaderResetCount());
    if(!store.getState().global.notification.isClosed) {
        store.dispatch(actionShowNotificationBar({visible: true, msg: "Connection error, reconnecting...", discardable: true}));
    }
    console.log('Reconnecting...');
    timeout = setTimeout(() => {
        client && client.disconnect();
        client = null;
        getClient()}, 2000);

};

const subscribe = (url, cb) => { getClient().subscribe(url, cb) };

const subscribeAll = () => subscriptions.forEach(([url, cb])=>subscribe(url, cb));

const addSubscribe = (url, cb)=>{
    subscriptions.push([url, cb]);
    subscribe(url, cb);
};

export const unsubscribe = (url) => {
    client && client.disconnect();
    client = null;
    timeout && clearTimeout(timeout);
    subscriptions.length = 0;
};

export const listener = (url, cb) => addSubscribe(url, cb);
