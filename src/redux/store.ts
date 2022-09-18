import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { WebStorage } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./reducers";

interface IpersistConfig {
  key: string;
  storage: WebStorage;
  //whitelist: any,
  blacklist: string[];
}

const persistConfig: IpersistConfig = {
  key: "root",
  storage,
  //whitelist: ['state'],    // only state will be persisted
  blacklist: ["tweets", "tags"], // state will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), //Non-Serializable Data fix error
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
