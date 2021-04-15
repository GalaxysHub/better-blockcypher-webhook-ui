import { combineReducers } from "redux";
import webhookReducer from "./webhookReducer";
import themeReducer from "./themeReducer.js";
import fieldsReducer from "./fieldsReducer.js";
import pageReducer from "./pageReducer.js";

export default combineReducers({
  webhookReducer,
  themeReducer,
  fieldsReducer,
  pageReducer,
});
