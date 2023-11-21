import userReducer from "./slices/user.slice";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const PersistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(PersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
