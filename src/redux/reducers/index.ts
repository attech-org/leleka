//Redux:
import { combineReducers } from "redux";

import likedTweetsReducer from "./likedTweets";
import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
  likedTweets: likedTweetsReducer,
});
