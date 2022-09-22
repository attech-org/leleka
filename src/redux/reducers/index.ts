//Redux:
import { combineReducers } from "redux";

import bookmarksReducer from "./bookmarks";
import followersReducer from "./followers";
import followingReducer from "./following";
import pwaReducer from "./pwa";
import tagsReducer from "./tags";
import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
  pwaInfo: pwaReducer,
  followers: followersReducer,
  following: followingReducer,
  tags: tagsReducer,
  bookmarks: bookmarksReducer,
});
