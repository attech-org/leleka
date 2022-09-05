//Redux:
import { combineReducers } from "redux";

import tweetsSlice from "./tweets";
import userSlice from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
