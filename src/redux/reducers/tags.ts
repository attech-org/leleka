import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, Tag } from "../../types";
import { Pagination } from "../../types/mock-api-types";

export interface TagsStore {
  tags: LE<Pagination<Tag>>;
}

const tagsInitialStore: TagsStore = {
  tags: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
};

const fetchTags = createAsyncThunk<
  Pagination<Tag>,
  (Pagination<Tag> & { query: string }) | undefined
>("tags/fetchTags", async (filters) => {
  const { limit = 10, nextPage = 1, query } = filters || {};

  const response = await instance.get("api/tags", {
    params: {
      limit,
      page: nextPage,
      query: { name: { $regex: query } },
    },
  });
  console.log("2. response - tags", response.data);
  return response.data;
});

const tagsSlice = createSlice<TagsStore, SliceCaseReducers<TagsStore>>({
  name: "tags",
  initialState: tagsInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (store) => {
      store.tags.isLoading = true;
      store.tags.error = "Loading error";
    });
    builder.addCase(fetchTags.fulfilled, (store, { payload }) => {
      // if (store.tags.docs.length === 0 || payload.page !== 1) {
      store.tags = {
        // ...store.tags,
        ...payload,
        // docs: [...store.tags.docs, ...payload.docs],
      };
      // }
      store.tags.isLoading = false;
    });
    builder.addCase(fetchTags.rejected, (store) => {
      store.tags.isLoading = false;
      store.tags.error = "Failed to fetch tags";
    });
  },
});

export const tagsActions = {
  ...tagsSlice.actions,
  fetchTags,
};

export default tagsSlice.reducer;
