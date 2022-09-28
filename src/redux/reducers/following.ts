import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, User } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export type FollowingStore = { list: LE<Pagination<User>> };

const followingInitialStore: FollowingStore = {
  list: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
};

interface FetchFollowingFunctionArgs {
  limit: number | undefined;
  nextPage: number | undefined;
  userId: string;
  userAccessToken: string;
}

export const fetchFollowing = createAsyncThunk<
  Pagination<User>,
  FetchFollowingFunctionArgs
>("following/fetch", async (params) => {
  const { limit = 10, nextPage = 1, userId, userAccessToken } = params;
  const response = await instance.get("api/followers", {
    params: {
      query: { follower: userId },
      limit,
      page: nextPage,
      sort: "-createdAt",
    },
    headers: {
      Authorization: userAccessToken,
    },
  });
  return response.data;
});

const followingSlice = createSlice<
  FollowingStore,
  SliceCaseReducers<FollowingStore>
>({
  name: "following",
  initialState: followingInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFollowing.pending, (store) => {
      store.list.isLoading = true;
    });
    builder.addCase(fetchFollowing.fulfilled, (store, { payload }) => {
      if (store.list.docs.length === 0 || payload.page !== 1) {
        // I don't know why, but first page we have twice
        // and only such way I resolved this problem
        store.list = {
          ...store.list,
          ...payload,
          docs: [...store.list.docs, ...payload.docs],
        };
      }
      store.list.isLoading = false;
    });
    builder.addCase(fetchFollowing.rejected, (store, { error }) => {
      store.list.isLoading = false;
      store.list.error = error.message;
    });
  },
});

export const followingActions = {
  ...followingSlice.actions,
  fetchFollowing,
};

export default followingSlice.reducer;
