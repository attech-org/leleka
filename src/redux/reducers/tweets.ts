import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { Tweet2 } from "../../types";

interface TweetsStore {
  feedTweets: Tweet2[];
  error?: string | Error;
}

const tweetsInitialStore: TweetsStore = {
  feedTweets: [],
};

const fetchFeedTweets = createAsyncThunk<TweetsStore["feedTweets"]>(
  "tweets/feed",
  async () => {
    const response = await instance.get("api/tweets");
    return response.data;
  }
);

const tweetsSlice = createSlice<TweetsStore, SliceCaseReducers<TweetsStore>>({
  name: "tweets",
  initialState: tweetsInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedTweets.pending, () => {
      console.warn("tweets are fetching");
    });
    builder.addCase(fetchFeedTweets.fulfilled, (store, { payload }) => {
      store.feedTweets = payload;
    });
    builder.addCase(fetchFeedTweets.rejected, (store) => {
      store.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = { ...tweetsSlice.actions, fetchFeedTweets };

export default tweetsSlice;
