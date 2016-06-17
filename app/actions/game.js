/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */

// Fetch posts logic
export function fetchGameObjects() {
    console.log("fetchGameObjects");
    return { type: types.GET_GAME_OBJECTS , data:[{id:1,count:"1",text:"1text1"}]};//,  };



    // return {
    //     type: types.GET_TOPICS,
    //     promise: makeRequest('get')
    // };
}


export function makeRequest(method, id, data, api = '/object') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


export function destroyGameObject(id, index) {
    console.log("destroyObject");
    return { type: types.DESTROY_GAME_OBJECT, id:1,count:"1",text:"1" };
}

export function createGameObject(text) {
    console.log("createObject");
    return { type: types.CREATE_GAME_OBJECT, id:1,count:"1",text:"1" };
}
