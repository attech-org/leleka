import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2 } from "../../types";
import { Pagination } from "../../types/mock-api-types";

interface TweetsStore {
  feedTweets: LE<Pagination<Tweet2>>;
}

const tweetsInitialStore: TweetsStore = {
  feedTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
};

const fetchFeedTweets = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("tweets/feed", async (filters) => {
  const { limit = 10, nextPage = 2 } = filters || {};
  const response = await instance.get("api/tweets", {
    params: { limit, page: nextPage },
  });
  return response.data;
});

const tweetsSlice = createSlice<TweetsStore, SliceCaseReducers<TweetsStore>>({
  name: "tweets",
  initialState: tweetsInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedTweets.pending, (store) => {
      store.feedTweets.isLoading = true;
    });
    builder.addCase(fetchFeedTweets.fulfilled, (store, { payload }) => {
      store.feedTweets.isLoading = false;
      store.feedTweets = {
        ...store.feedTweets,
        ...payload,
        docs: [...store.feedTweets.docs, ...payload.docs],
      };
    });
    builder.addCase(fetchFeedTweets.rejected, (store) => {
      store.feedTweets.isLoading = false;
      store.feedTweets.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = { ...tweetsSlice.actions, fetchFeedTweets };

export default tweetsSlice;
