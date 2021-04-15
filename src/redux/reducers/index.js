import { combineReducers } from "redux";
import webhookReducer from "./webhookReducer";
import themeReducer from "./themeReducer.js";

export default combineReducers({ webhookReducer, themeReducer });
