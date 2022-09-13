import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2, Like } from "../../types";
import { Pagination } from "../../types/mock-api-types";

interface TweetsStore {
  feedTweets: LE<Pagination<Tweet2>>;
  singleTweet: LE<object>;
  likes: LE<Pagination<Like>>;
}

const tweetsInitialStore: TweetsStore = {
  feedTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  singleTweet: {},
  likes: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
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

const fetchLikes = createAsyncThunk<
  Pagination<Like>,
  Pagination<Like> | undefined
>("profile/likes", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};

  const response = await instance.get("api/likes", {
    params: {
      limit,
      page: nextPage,
    },
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
    builder.addCase(fetchLikes.pending, (store) => {
      store.likes.isLoading = true;
    });
    builder.addCase(fetchLikes.fulfilled, (store, { payload }) => {
      if (store.likes.docs.length === 0 || payload.page !== 1) {
        store.likes = {
          ...store.likes,
          ...payload,
          docs: [...store.likes.docs, ...payload.docs],
        };
      }
      store.likes.isLoading = false;
    });
    builder.addCase(fetchLikes.rejected, (store) => {
      store.likes.isLoading = false;
      store.likes.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = {
  ...tweetsSlice.actions,
  fetchFeedTweets,
  createTweet,
  fetchLikes,
};

export default tweetsSlice.reducer;
