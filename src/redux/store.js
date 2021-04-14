import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

import { logger } from "redux-logger";

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
