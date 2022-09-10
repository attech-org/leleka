import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2 } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export interface TweetsStore {
  currentTweet: LE<{ data?: Tweet2 }>;
  feedTweets: LE<Pagination<Tweet2>>;
  feedReplies: LE<Pagination<Tweet2>>;
}

const tweetsInitialStore: TweetsStore = {
  feedTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
    isLoading: false,
  },
  currentTweet: {},
  feedReplies: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
    isLoading: false,
  },
};

const fetchFeedTweets = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("tweets/feed", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};
  const response = await instance.get("api/tweets", {
    params: { limit, page: nextPage },
  });
  return response.data;
});

const fetchTweetById = createAsyncThunk<Pagination<Tweet2>, string>(
  "tweet/id",
  async (_id) => {
    const response = await instance.get("api/tweets/", {
      params: { query: { _id } },
    });
    return response.data;
  }
);

const fetchTweetReplies = createAsyncThunk<
  Pagination<Tweet2>,
  (Pagination<Tweet2> & { tweetId: string }) | undefined
>("replies/feed", async (filters) => {
  const { limit = 10, nextPage = 1, tweetId } = filters || {};
  const response = await instance.get("api/tweets", {
    params: { limit, page: nextPage, query: { repliedTo: tweetId } },
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
      if (store.feedTweets.docs.length === 0 || payload.page !== 1) {
        // I don't know why, but first page we have twice
        // and only such way I resolved this problem
        store.feedTweets = {
          ...store.feedTweets,
          ...payload,
          docs: [...store.feedTweets.docs, ...payload.docs],
        };
      }
      store.feedTweets.isLoading = false;
    });
    builder.addCase(fetchFeedTweets.rejected, (store) => {
      store.feedTweets.isLoading = false;
      store.feedTweets.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchTweetById.pending, (store) => {
      store.currentTweet.isLoading = true;
    });
    builder.addCase(fetchTweetById.fulfilled, (store, { payload }) => {
      store.currentTweet.data = payload.docs[0];
      store.currentTweet.isLoading = false;
    });
    builder.addCase(fetchTweetById.rejected, (store) => {
      store.currentTweet.isLoading = false;
      store.currentTweet.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchTweetReplies.pending, (store) => {
      store.feedReplies.isLoading = true;
    });
    builder.addCase(fetchTweetReplies.fulfilled, (store, { payload }) => {
      store.feedReplies = {
        ...store.feedReplies,
        ...payload,
        docs: [...store.feedReplies.docs, ...payload.docs],
      };
      store.feedReplies.isLoading = false;
    });
    builder.addCase(fetchTweetReplies.rejected, (store) => {
      store.feedReplies.isLoading = false;
      store.feedReplies.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = {
  ...tweetsSlice.actions,
  fetchFeedTweets,
  fetchTweetById,
  fetchTweetReplies,
};

export default tweetsSlice.reducer;
