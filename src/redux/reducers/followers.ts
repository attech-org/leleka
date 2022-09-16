import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, User } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export type FollowersStore = { list: LE<Pagination<User>> };

const followersInitialStore: FollowersStore = {
  list: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
};

interface FetchFollowersFunctionArgs {
  limit: number | undefined;
  nextPage: number | undefined;
  userId: string;
  userAccessToken: string;
}

export const fetchFollowers = createAsyncThunk<
  Pagination<User>,
  FetchFollowersFunctionArgs
>("followers/fetch", async (params) => {
  const { limit = 10, nextPage = 1, userId, userAccessToken } = params;
  const response = await instance.get("api/followers", {
    params: {
      query: { following: userId },
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

const followersSlice = createSlice<
  FollowersStore,
  SliceCaseReducers<FollowersStore>
>({
  name: "followers",
  initialState: followersInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFollowers.pending, (store) => {
      store.list.isLoading = true;
    });
    builder.addCase(fetchFollowers.fulfilled, (store, { payload }) => {
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
    builder.addCase(fetchFollowers.rejected, (store) => {
      store.list.isLoading = false;
      store.list.error = "Failed to fetch followers";
    });
  },
});

export const followersActions = {
  ...followersSlice.actions,
  fetchFollowers,
};

export default followersSlice.reducer;
