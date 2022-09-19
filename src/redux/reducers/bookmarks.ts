import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tweet2 } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export type BookmarksStore = {
  id: string;
  list: LE<Pagination<Tweet2>>;
};

const bookmarksInitialStore: BookmarksStore = {
  list: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  id: "",
};

interface FetchBookmarksFunctionArgs {
  limit: number | undefined;
  nextPage: number | undefined;
  bookmarkId: string;
}

export const fetchBookmarks = createAsyncThunk<
  Pagination<Tweet2>,
  FetchBookmarksFunctionArgs
>("bookmarks/fetch", async (params) => {
  const { limit = 10, nextPage = 1, bookmarkId } = params;
  const response = await instance.get("api/bookmarks", {
    params: {
      query: { bookmark: bookmarkId },
      limit,
      page: nextPage,
      sort: "-createdAt",
    },
  });
  return response.data;
});

const bookmarksSlice = createSlice<
  BookmarksStore,
  SliceCaseReducers<BookmarksStore>
>({
  name: "bookmarks",
  initialState: bookmarksInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookmarks.pending, (store) => {
      store.list.isLoading = true;
    });
    builder.addCase(fetchBookmarks.fulfilled, (store, { payload }) => {
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
    builder.addCase(fetchBookmarks.rejected, (store) => {
      store.list.isLoading = false;
      store.list.error = "Failed to fetch bookmarks";
    });
  },
});

export const bookmarksActions = {
  ...bookmarksSlice.actions,
  fetchBookmarks,
};

export default bookmarksSlice.reducer;
