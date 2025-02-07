import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createLogger } from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import user from "./features/user/userSlice";
import app from "./features/app/appSlice";
import { reduxStorage } from "@/utils";

const rootReducer = combineReducers({
  user,
  app,
});

type RootReducerType = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerType> = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["user", "app"],
  blacklist: [],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

const createEnhancers = (getDefaultEnhancers: any) => {
  if (__DEV__) {
    const reactotron = require("../../devtools/ReactotronConfig").default;
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  } else {
    return getDefaultEnhancers();
  }
};

const configReduxStore = (withLogger: boolean = false) => {
  return withLogger
    ? configureStore({
        reducer: persistedReducer,
        enhancers: createEnhancers,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
          }).concat(logger),
      })
    : configureStore({
        reducer: persistedReducer,
        enhancers: createEnhancers,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
          }),
      });
};

const store = configReduxStore();
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, store, persistor };
