//Redux:
import { combineReducers } from "redux";

import tweetsSlice from "./tweets";

export const rootReducer = combineReducers({
  tweets: tweetsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
