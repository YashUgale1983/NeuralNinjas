import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import iniReducer from "./slices/initialSlice.js";

const persistConfig = {
  key: "root",
  storage: localStorage,
  version: 1,
};

const reducer = combineReducers({
  doc: iniReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export default store;
