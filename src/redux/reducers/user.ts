import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import instance from "../../services/api";
import { LE, User } from "../../types";

export interface UserStore {
  authUser: LE<User>;
  userByUsername: LE<User>;
}

const initialState = {
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

const userInitialState: UserStore = {
  authUser: initialState,
  userByUsername: initialState,
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
    console.log(`loginUser ${JSON.stringify(response.data)}`);
    return response.data;
  }
);

const fetchUser = createAsyncThunk<User, string>(
  "profile/username",
  async (username) => {
    const response = await instance.get("api/users", {
      params: { query: { username: username } },
    });
    console.log("RESPONSE DATA FETCHUSER");
    console.log(response.data.docs);
    return response.data.docs[0];
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    //  temporary reducers
    addBanner: (state, action: PayloadAction<string>) => {
      state.authUser.profile.banner = action.payload;
    },
    removeBanner: (state) => {
      state.authUser.profile.banner = undefined;
    },
    addAvatar: (state, action: PayloadAction<string>) => {
      state.authUser.profile.avatar = action.payload;
    },
    clearError: (state) => {
      state.authUser.error = "";
    },

    resetUserData: () => {
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      Object.assign(store.authUser, {
        ...userInitialState.authUser,
        ...payload.user,
        auth: {
          local: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        },
      });
    });
    builder.addCase(registerUser.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to register user";
    });

    builder.addCase(loginUser.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      localStorage.setItem("accessToken", payload.accessToken);
      console.log(`access token: ${payload.accessToken}`);
      localStorage.setItem("refreshToken", payload.refreshToken);
      Object.assign(store.authUser, {
        ...userInitialState.authUser,
        ...payload.user,
        auth: {
          local: {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          },
        },
      });
    });
    builder.addCase(loginUser.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to login user";
    });
    builder.addCase(fetchUser.pending, (store) => {
      store.userByUsername.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (store, { payload }) => {
      store.userByUsername = { ...userInitialState, ...payload };
      store.userByUsername.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (store) => {
      store.userByUsername.isLoading = false;
      store.userByUsername.error = "Failed to fetch user by username";
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  registerUser,
  loginUser,
  fetchUser,
};

export default userSlice.reducer;
