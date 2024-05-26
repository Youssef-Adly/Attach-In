import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import langSlice from "./slices/langSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const reducer = combineReducers({
  theme: themeSlice,
  lang: langSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
