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
  myMentions: LE<Pagination<Tweet2>>;
  likeInfo: LE<TweetLike>;
  userTweets: LE<Pagination<Tweet2>>;
  userTweetsAndReplies: LE<Pagination<Tweet2>>;
  userLikes: LE<Pagination<Like>>;
}

const initialStore = {
  page: 1,
  limit: 10,
  docs: [],
  hasNextPage: true,
};

const tweetsInitialStore: TweetsStore = {
  feedTweets: initialStore,
  singleTweet: {},
  currentTweet: {},
  currentTweetReplies: {
    ...initialStore,
    isLoading: false,
  },
  likes: initialStore,
  myTweets: initialStore,
  myTweetsAndReplies: initialStore,
  userTweets: initialStore,
  userTweetsAndReplies: initialStore,
  userLikes: initialStore,
  myMentions: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  likeInfo: {
    user: "",
    tweet: "",
    _id: "",
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
    params: {
      limit,
      page: nextPage,
      query: { repliedTo: tweetId },
      sort: "-createdAt",
    },
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
      sort: "-createdAt",
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
      sort: "-createdAt",
    },
  });
  return response.data;
});

const fetchUserTweets = createAsyncThunk<
  Pagination<Tweet2>,
  (Pagination<Tweet2> & { userId: string; init?: boolean }) | undefined
>("profile/usertweets", async (filters) => {
  const {
    limit = tweetsInitialStore.userTweets.limit,
    nextPage = 1,
    userId,
  } = filters || {};
  const response = await instance.get("api/tweets", {
    params: {
      limit,
      page: nextPage,
      query: { author: userId },
      sort: "-createdAt",
    },
  });
  response.data.init = filters?.init;
  return response.data;
});

const fetchUserTweetsReplies = createAsyncThunk<
  Pagination<Tweet2>,
  (Pagination<Tweet2> & { userId: string; init?: boolean }) | undefined
>("profile/usertweetsreplies", async (filters) => {
  const {
    limit = tweetsInitialStore.userTweetsAndReplies.limit,
    nextPage = 1,
    userId,
  } = filters || {};
  const response = await instance.get("api/tweets", {
    params: {
      limit,
      page: nextPage,
      query: { author: userId, repliedTo: { $ne: null } },
      sort: "-createdAt",
    },
  });
  response.data.init = filters?.init;
  return response.data;
});

const fetchUserLikes = createAsyncThunk<
  Pagination<Like>,
  (Pagination<Like> & { userId: string; init?: boolean }) | undefined
>("profile/userlikes", async (filters) => {
  const {
    limit = tweetsInitialStore.userLikes.limit,
    nextPage = 1,
    userId,
  } = filters || {};
  const response = await instance.get("api/likes", {
    params: {
      limit,
      page: nextPage,
      query: { user: { _id: userId } },
      sort: "-createdAt",
    },
  });
  response.data.init = filters?.init;
  return response.data;
});

interface FetchMentionsArgs {
  limit: number | undefined;
  nextPage: number | undefined;
  searchString: string;
}

const fetchMentions = createAsyncThunk<Pagination<Tweet2>, FetchMentionsArgs>(
  "notifications/mentions",
  async (params) => {
    const { limit = 10, nextPage = 1, searchString } = params || {};
    const response = await instance.get("api/tweets", {
      params: {
        limit: limit,
        page: nextPage,
        query: { content: { $regex: searchString, $options: "i" } },
        sort: "-updatedAt",
      },
    });
    return response.data;
  }
);

interface TweetLike {
  user: string;
  tweet: string;
  _id: string;
}

export const likeDislike = createAsyncThunk<
  TweetLike,
  { tweet: string }
>("tweets/likeDislike", async (body) => {
  const response = await instance.post("api/likes", body);
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

    builder.addCase(fetchMentions.pending, (store) => {
      store.myMentions.isLoading = true;
    });
    builder.addCase(fetchMentions.fulfilled, (store, { payload }) => {
      if (store.myMentions.docs.length === 0 || payload.page !== 1) {
        store.myMentions = {
          ...store.myMentions,
          ...payload,
          docs: [...store.myMentions.docs, ...payload.docs],
        };
      }
      store.myMentions.isLoading = false;
    });
    builder.addCase(fetchMentions.rejected, (store) => {
      store.myMentions.isLoading = false;
      store.myMentions.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(likeDislike.pending, (store) => {
      store.likeInfo.isLoading = true;
    });
    builder.addCase(likeDislike.fulfilled, (store) => {
      store.likeInfo.isLoading = false;
    });
    builder.addCase(likeDislike.rejected, (store) => {
      store.likeInfo.isLoading = false;
      store.likeInfo.error = "Failed to like/dislike tweet";
    });
    builder.addCase(fetchUserTweets.pending, (store) => {
      store.userTweets.isLoading = true;
    });
    builder.addCase(fetchUserTweets.fulfilled, (store, { payload }) => {
      if (payload.init) {
        store.userTweets = { ...payload, docs: [...payload.docs] };
        store.userTweets.isLoading = false;
        store.userTweets.init = false;
      } else {
        if (store.userTweets.docs.length === 0 || payload.page !== 1) {
          store.userTweets = {
            ...store.userTweets,
            ...payload,
            docs: [...store.userTweets.docs, ...payload.docs],
          };
        }
      }
      store.userTweets.isLoading = false;
    });
    builder.addCase(fetchUserTweets.rejected, (store) => {
      store.userTweets.isLoading = false;
      store.userTweets.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchUserTweetsReplies.pending, (store) => {
      store.userTweetsAndReplies.isLoading = true;
    });
    builder.addCase(fetchUserTweetsReplies.fulfilled, (store, { payload }) => {
      if (payload.init) {
        store.userTweetsAndReplies = { ...payload, docs: [...payload.docs] };
        store.userTweetsAndReplies.isLoading = false;
        store.userTweetsAndReplies.init = false;
      } else {
        if (
          store.userTweetsAndReplies.docs.length === 0 ||
          payload.page !== 1
        ) {
          store.userTweetsAndReplies = {
            ...store.userTweetsAndReplies,
            ...payload,
            docs: [...store.userTweetsAndReplies.docs, ...payload.docs],
          };
        }
      }
      store.userTweetsAndReplies.isLoading = false;
    });
    builder.addCase(fetchUserTweetsReplies.rejected, (store) => {
      store.userTweetsAndReplies.isLoading = false;
      store.userTweetsAndReplies.error = "Failed to fetch tweets for feed";
    });
    builder.addCase(fetchUserLikes.pending, (store) => {
      store.userLikes.isLoading = true;
    });
    builder.addCase(fetchUserLikes.fulfilled, (store, { payload }) => {
      if (payload.init) {
        store.userLikes = { ...payload, docs: [...payload.docs] };
        store.userLikes.isLoading = false;
        store.userLikes.init = false;
      } else {
        if (store.userLikes.docs.length === 0 || payload.page !== 1) {
          store.userLikes = {
            ...store.userLikes,
            ...payload,
            docs: [...store.userLikes.docs, ...payload.docs],
          };
        }
      }
      store.userLikes.isLoading = false;
    });
    builder.addCase(fetchUserLikes.rejected, (store) => {
      store.userLikes.isLoading = false;
      store.userLikes.error = "Failed to fetch tweets for feed";
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
  fetchMentions,
  likeDislike,
  fetchUserTweets,
  fetchUserTweetsReplies,
  fetchUserLikes,
};

export default tweetsSlice.reducer;
