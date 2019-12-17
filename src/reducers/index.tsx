import { combineReducers } from "redux";
import user from "./userReducer";
import formReducer from "./formReducer";
import counter from "./counter";
import {reducer as form} from 'redux-form'

export default combineReducers({
    user,
    counter,
    formReducer,
    form
});