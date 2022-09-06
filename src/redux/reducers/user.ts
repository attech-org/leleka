import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, User } from "../../types";

export type UserStore = User &
  LE<{
    // some custom typings for store
  }>;

const userInitialState: UserStore = {
  _id: "",
  username: "",
  name: "",
  location: undefined,
  url: undefined,
  description: undefined,
  verified: false,
  followersCount: 0,
  friendsCount: 0,
  listedCount: 0,
  favouritesCount: 0,
  statusesCount: 0,
  createdAt: undefined,
  updatedAt: undefined,
  email: "",
  profile: {
    firstName: "",
    lastName: "",
    avatar: undefined,
    bio: undefined,
    phone: undefined,
    gender: undefined,
  },
  auth: {
    local: {
      accessToken: undefined,
      refreshToken: undefined,
    },
    twitter: {
      accessToken: undefined,
      refreshToken: undefined,
    },
  },
  isLoading: false,
  error: undefined,
};
interface RegisterResponse {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}
const registerUser = createAsyncThunk<RegisterResponse, User>(
  "auth/register",
  async ({ username, password, email }) => {
    const response = await instance.post("api/auth/register", {
      username,
      password,
      email,
      name: username, // temporal field
    });

    // return {
    //   ...response.data,
    //   auth: {
    //     local: {
    //       accessToken: response.data.accessToken,
    //       refreshToken: response.data.refreshToken,
    //     },
    //   },
    // };
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserStore>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      return { ...state, ...action.payload };
    },
    resetUserData: () => {
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (store) => {
      store.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (store, { payload }) => {
      store.isLoading = false;
      store = {
        ...store,
        ...payload.user,
        auth: {
          local: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        },
      };
    });
    builder.addCase(registerUser.rejected, (store) => {
      store.isLoading = false;
      store.error = "Failed to fetch";
    });
  },
});

export const userActions = { ...userSlice.actions, registerUser };

export default userSlice.reducer;
