//Redux:
import { combineReducers } from "redux";

import tweetsSlice from "./tweets";
import { userSlice } from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
