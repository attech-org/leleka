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
    banner: undefined,
    avatar:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    bio: undefined,
    birthDate: undefined,
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
interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

interface LoginResponse {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
  "auth/register",
  async ({ username, password, email }) => {
    const response = await instance.post("api/auth/register", {
      username,
      password,
      email,
      name: username,
    });
    return response.data;
  }
);
const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async ({ username, password }) => {
    const response = await instance.post("api/auth/login", {
      username,
      password,
      email: "",
    });
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

    //  temporary reducers
    addBanner: (state, action: PayloadAction<string>) => {
      state.profile.banner = action.payload;
    },
    removeBanner: (state) => {
      state.profile.banner = undefined;
    },
    addAvatar: (state, action: PayloadAction<string>) => {
      state.profile.avatar = action.payload;
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
      store.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
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
      store.error = "Failed to register user";
    });

    builder.addCase(loginUser.pending, (store) => {
      store.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (store, { payload }) => {
      store.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
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
    builder.addCase(loginUser.rejected, (store) => {
      store.isLoading = false;
      store.error = "Failed to login user";
    });
  },
});

export const userActions = { ...userSlice.actions, registerUser, loginUser };

export default userSlice.reducer;
