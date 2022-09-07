//Redux:
import { combineReducers } from "redux";

import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
});
