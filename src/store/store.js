import { configureStore } from "@reduxjs/toolkit";
import {
  webhookReducer,
  themeReducer,
  fieldsReducer,
  pageReducer,
  tokenReducer,
} from "./slices";
import { logger } from "redux-logger";

export default configureStore({
  reducer: {
    webhookReducer,
    themeReducer,
    fieldsReducer,
    pageReducer,
    tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
