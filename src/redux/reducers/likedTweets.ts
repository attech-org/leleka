import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2 } from "../../types";
import { Pagination } from "../../types/mock-api-types";

interface TweetsStore {
  feedLikedTweets: LE<Pagination<Tweet2>>;
  // singleTweet: LE<object>;
}

const tweetsInitialStore: TweetsStore = {
  feedLikedTweets: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  // singleTweet: {},
};

const fetchFeedLikedTweets = createAsyncThunk<
  Pagination<Tweet2>,
  Pagination<Tweet2> | undefined
>("profile/likes", async (filters) => {
  const { limit = 10, nextPage = 1 } = filters || {};
  const response = await instance.get("api/tweets", {
    params: { limit, page: nextPage },
  });
  return response.data;
});

const likedTweetsSlice = createSlice<
  TweetsStore,
  SliceCaseReducers<TweetsStore>
>({
  name: "likedTweets",
  initialState: tweetsInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedLikedTweets.pending, (store) => {
      store.feedLikedTweets.isLoading = true;
    });
    builder.addCase(fetchFeedLikedTweets.fulfilled, (store, { payload }) => {
      if (store.feedLikedTweets.docs.length === 0 || payload.page !== 1) {
        // I don't know why, but first page we have twice
        // and only such way I resolved this problem
        store.feedLikedTweets = {
          ...store.feedLikedTweets,
          ...payload,
          docs: [...store.feedLikedTweets.docs, ...payload.docs],
        };
        console.log(store.feedLikedTweets);
      }
      store.feedLikedTweets.isLoading = false;
    });
    builder.addCase(fetchFeedLikedTweets.rejected, (store) => {
      store.feedLikedTweets.isLoading = false;
      store.feedLikedTweets.error = "Failed to fetch tweets for feed";
    });
  },
});

export const likedTweetsActions = {
  ...likedTweetsSlice.actions,
  fetchFeedLikedTweets,
};

export default likedTweetsSlice.reducer;
