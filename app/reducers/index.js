import { combineReducers } from 'redux';
import game from 'reducers/game';
import user from 'reducers/user';
import topic from 'reducers/topic';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    user,
    game,
    topic,
    message,
    routing
});

export default rootReducer;
