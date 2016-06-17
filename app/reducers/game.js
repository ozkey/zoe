
// import * as types from 'types';

import {
    GET_GAME_OBJECTS,
    CREATE_GAME_OBJECT,
    DESTROY_GAME_OBJECT,
   } from 'types';


export default function game(state = {
    gameObjects: [],
    gameObject: ''
}, action) {
    switch (action.type) {

        case GET_GAME_OBJECTS:
            return state;
            // return Object.assign({}, state, {
            //     isFetching: true
            // });

        case CREATE_GAME_OBJECT:
            return {
                gameObjects: [...state.gameObjects, { id: action.id, count: action.count, text: action.text }],
            };

        case DESTROY_GAME_OBJECT:
            return {
                gameObjects: [...state.gameObjects.filter((tp, i) => i !== action.index)],
            };

        default:
            return state;
    }
}
