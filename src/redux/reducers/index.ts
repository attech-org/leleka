//Redux:
import { combineReducers } from "redux";

import pwaReducer from "./pwa";
import tweetsReducer from "./tweets";
import userReducer from "./user";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  user: userReducer,
  pwaInfo: pwaReducer,
});
