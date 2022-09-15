//Redux:
import { combineReducers } from "redux";

import pwaReducer from "./pwa";
import tagsReducer from "./tags";
import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
  pwaInfo: pwaReducer,
  tags: tagsReducer,
});
