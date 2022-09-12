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
  singleTweet: LE<object>;
  currentTweetRelies: LE<Pagination<Tweet2>>;
}

const tweetsInitialStore: TweetsStore = {
  feedTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  singleTweet: {},
  currentTweet: {},
  currentTweetRelies: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
    isLoading: false,
  },
};

interface NewTweetBody {
  repliedTo?: string;
  content: string;
}

export const createTweet = createAsyncThunk<Tweet2, NewTweetBody>(
  "tweets/create",
  async (body) => {
    const response = await instance.post("api/tweets", body);
    return response.data;
  }
);

const fetchFeedTweets = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("tweets/feed", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};
  const response = await instance.get("api/tweets", {
    params: { limit, page: nextPage, sort: "-createdAt" },
  });
  return response.data;
});

const fetchTweetById = createAsyncThunk<Tweet2, string>(
  "tweet/id",
  async (id) => {
    const response = await instance.get(`api/tweets/${id}`);
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
    builder.addCase(createTweet.pending, (store) => {
      store.singleTweet.isLoading = true;
    });
    builder.addCase(createTweet.fulfilled, (store) => {
      store.singleTweet.isLoading = false;
    });
    builder.addCase(createTweet.rejected, (store) => {
      store.singleTweet.isLoading = false;
      store.singleTweet.error = "Failed to post tweet on server";
    });
    builder.addCase(fetchTweetById.pending, (store) => {
      store.currentTweet.isLoading = true;
    });
    builder.addCase(fetchTweetById.fulfilled, (store, { payload }) => {
      store.currentTweet.data = payload;
      store.currentTweet.isLoading = false;
    });
    builder.addCase(fetchTweetById.rejected, (store) => {
      store.currentTweet.isLoading = false;
      store.currentTweet.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchTweetReplies.pending, (store) => {
      store.currentTweetRelies.isLoading = true;
    });
    builder.addCase(fetchTweetReplies.fulfilled, (store, { payload }) => {
      if (store.currentTweetRelies.docs.length === 0 || payload.page !== 1) {
        store.currentTweetRelies = {
          ...store.currentTweetRelies,
          ...payload,
          docs: [...store.currentTweetRelies.docs, ...payload.docs],
        };
      }
      store.currentTweetRelies.isLoading = false;
    });
    builder.addCase(fetchTweetReplies.rejected, (store) => {
      store.currentTweetRelies.isLoading = false;
      store.currentTweetRelies.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = {
  ...tweetsSlice.actions,
  fetchFeedTweets,
  createTweet,
  fetchTweetById,
  fetchTweetReplies,
};

export default tweetsSlice.reducer;
