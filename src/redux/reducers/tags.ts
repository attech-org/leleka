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
  tagsList: LE<Pagination<Tag>>;
}

const tagsInitialStore: TagsStore = {
  tags: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
  tagsList: {
    page: 1,
    limit: 10,
    docs: [],
    hasNextPage: true,
  },
};

const fetchTags = createAsyncThunk<
  Pagination<Tag>,
  { searchString: string } | undefined
>("tags/fetchTags", async (filters) => {
  const { searchString } = filters || {};

  const response = await instance.get("api/tags", {
    params: {
      query: { name: { $regex: searchString, $options: "i" } },
    },
  });
  return response.data;
});

const fetchTagsList = createAsyncThunk<Pagination<Tag>>(
  "tags/fetchTagsList",
  async () => {
    const response = await instance.get("api/tags", {
      params: {
        sort: "-stats.tweets",
      },
    });
    return response.data;
  }
);

const tagsSlice = createSlice<TagsStore, SliceCaseReducers<TagsStore>>({
  name: "tags",
  initialState: tagsInitialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (store) => {
      store.tags.isLoading = true;
    });
    builder.addCase(fetchTags.fulfilled, (store, { payload }) => {
      store.tags = { ...payload };
      store.tags.isLoading = false;
    });
    builder.addCase(fetchTags.rejected, (store, { error }) => {
      store.tags.isLoading = false;
      store.tags.error = error.message;
    });
    builder.addCase(fetchTagsList.pending, (store) => {
      store.tagsList.isLoading = true;
    });
    builder.addCase(fetchTagsList.fulfilled, (store, { payload }) => {
      store.tagsList = { ...payload };
      store.tagsList.isLoading = false;
    });
    builder.addCase(fetchTagsList.rejected, (store, { error }) => {
      store.tagsList.isLoading = false;
      store.tagsList.error = error.message;
    });
  },
});

export const tagsActions = {
  ...tagsSlice.actions,
  fetchTags,
  fetchTagsList,
};

export default tagsSlice.reducer;
