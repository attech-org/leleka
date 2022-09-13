//Redux:
import { combineReducers } from "redux";

import followersReducer from "./followers";
import followingReducer from "./following";
import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
  followers: followersReducer,
  following: followingReducer,
});
