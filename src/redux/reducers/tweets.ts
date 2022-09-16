import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2, Like } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export interface TweetsStore {
  currentTweet: LE<{ data?: Tweet2 }>;
  feedTweets: LE<Pagination<Tweet2>>;
  singleTweet: LE<object>;
  currentTweetReplies: LE<Pagination<Tweet2>>;
  likes: LE<Pagination<Like>>;
  myTweets: LE<Pagination<Tweet2>>;
  myTweetsAndReplies: LE<Pagination<Tweet2>>;
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
  currentTweetReplies: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
    isLoading: false,
  },
  likes: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  myTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  myTweetsAndReplies: {
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

const createReply = createAsyncThunk<Tweet2, NewTweetBody>(
  "tweets/reply",
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

const fetchMyTweets = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("profile/mytweets", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};

  const response = await instance.get("api/tweets/my", {
    params: {
      limit,
      page: nextPage,
    },
  });
  return response.data;
});

const fetchMyTweetsAndReplies = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("profile/tweetsnreplies", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};

  const response = await instance.get("api/tweets/my", {
    params: {
      limit,
      page: nextPage,
      query: { repliedTo: { $ne: null } },
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
    builder.addCase(createTweet.fulfilled, (store, { payload }) => {
      store.singleTweet.isLoading = false;
      store.feedTweets.docs = [payload, ...store.feedTweets.docs];
    });
    builder.addCase(createTweet.rejected, (store) => {
      store.singleTweet.isLoading = false;
      store.singleTweet.error = "Failed to post tweet on server";
    });
    builder.addCase(createReply.pending, (store) => {
      store.currentTweetReplies.isLoading = true;
    });
    builder.addCase(createReply.fulfilled, (store) => {
      store.currentTweetReplies.isLoading = false;
      // TODO: for real time update
      // store.currentTweetReplies.docs = [
      //   payload,
      //   ...store.currentTweetReplies.docs,
      // ];
    });
    builder.addCase(createReply.rejected, (store) => {
      store.currentTweetReplies.isLoading = false;
      store.currentTweetReplies.error = "Failed to post tweet on server";
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
      store.currentTweetReplies.isLoading = true;
    });
    builder.addCase(fetchTweetReplies.fulfilled, (store, { payload }) => {
      if (store.currentTweetReplies.docs.length === 0 || payload.page !== 1) {
        store.currentTweetReplies = {
          ...store.currentTweetReplies,
          ...payload,
          docs: [...store.currentTweetReplies.docs, ...payload.docs],
        };
      }
      store.currentTweetReplies.isLoading = false;
    });
    builder.addCase(fetchTweetReplies.rejected, (store) => {
      store.currentTweetReplies.isLoading = false;
      store.currentTweetReplies.error = "Failed to fetch tweets for feed";
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
    builder.addCase(fetchMyTweets.pending, (store) => {
      store.myTweets.isLoading = true;
    });
    builder.addCase(fetchMyTweets.fulfilled, (store, { payload }) => {
      if (store.myTweets.docs.length === 0 || payload.page !== 1) {
        store.myTweets = {
          ...store.myTweets,
          ...payload,
          docs: [...store.myTweets.docs, ...payload.docs],
        };
      }
      store.myTweets.isLoading = false;
    });
    builder.addCase(fetchMyTweets.rejected, (store) => {
      store.myTweets.isLoading = false;
      store.myTweets.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchMyTweetsAndReplies.pending, (store) => {
      store.myTweetsAndReplies.isLoading = true;
    });
    builder.addCase(fetchMyTweetsAndReplies.fulfilled, (store, { payload }) => {
      if (store.myTweetsAndReplies.docs.length === 0 || payload.page !== 1) {
        store.myTweetsAndReplies = {
          ...store.myTweetsAndReplies,
          ...payload,
          docs: [...store.myTweetsAndReplies.docs, ...payload.docs],
        };
      }
      store.myTweetsAndReplies.isLoading = false;
    });
    builder.addCase(fetchMyTweetsAndReplies.rejected, (store) => {
      store.myTweetsAndReplies.isLoading = false;
      store.myTweetsAndReplies.error = "Failed to fetch tweets for feed";
    });
  },
});

export const tweetsActions = {
  ...tweetsSlice.actions,
  fetchFeedTweets,
  createTweet,
  fetchTweetById,
  fetchTweetReplies,
  fetchLikes,
  fetchMyTweets,
  fetchMyTweetsAndReplies,
  createReply,
};

export default tweetsSlice.reducer;
