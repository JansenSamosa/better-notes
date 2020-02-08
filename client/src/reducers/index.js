import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';

/* createStore requites the 1st argument(rootReducer) to be a function, hence
why we are exporting a function. */

/* combineReducers takes in an object {} */

/* combineReducer  combines all reducers. reducers can include postReducer, 
authReducer, todoReducer, assignmentReducer, etc... basically any
reducer you make */

export default combineReducers({
    auth: authReducer,
    error: errorReducer
})
