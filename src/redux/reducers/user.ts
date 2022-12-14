import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import instance from "../../services/api";
import ws from "../../services/getWebSocket";
import { LE, User } from "../../types";

export interface UserStore {
  authUser: LE<User>;
  userByUsername: LE<User>;
  followedUser: LE<User>;
}

const initialState = {
  _id: "",
  username: "",
  name: "",
  location: undefined,
  url: undefined,
  description: undefined,
  verified: false,
  createdAt: undefined,
  updatedAt: undefined,
  email: "",
  stats: {
    listedCount: 0,
    favouritesCount: 0,
    statusesCount: 0,
    followersCount: 0,
    followingCount: 0,
  },
  profile: {
    firstName: "",
    lastName: "",
    banner: undefined,
    avatar: undefined,
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
  followedUser: initialState,
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
interface EditProfileRequest {
  username: string;
  website: string;
  location: string;
  bio: string;
  birthDate: string;
  userId: string;
}

interface EditAvatarRequest {
  avatarImage: FormData;
  userId: string;
}

interface EditBannerRequest {
  bannerImage: FormData;
  userId: string;
}

const editProfileUser = createAsyncThunk<Partial<User>, EditProfileRequest>(
  "users/profile",
  async ({ username, bio, location, website, birthDate, userId }) => {
    const response = await instance.put(`api/users/${userId}`, {
      username,
      url: website,
      location,
      profile: {
        bio,
        birthDate,
      },
    });
    return response.data;
  }
);
const addAvatarAsync = createAsyncThunk<Partial<User>, EditAvatarRequest>(
  "users/profile/avatar",
  async ({ avatarImage, userId }) => {
    const response = await instance.put(`api/users/${userId}`, avatarImage);

    return response.data;
  }
);
const addBannerAsync = createAsyncThunk<Partial<User>, EditBannerRequest>(
  "users/profile/banner",
  async ({ bannerImage, userId }) => {
    const response = await instance.put(`api/users/${userId}`, bannerImage);

    return response.data;
  }
);

const fetchUser = createAsyncThunk<User, string>(
  "profile/username",
  async (username) => {
    const response = await instance.get("api/users", {
      params: { query: { username: username } },
    });
    return response.data.docs[0];
  }
);

const follow = createAsyncThunk<User, string>(
  "profile/follow",
  async (followedUserId) => {
    const response = await instance.post("api/followers", {
      following: followedUserId,
    });
    return response.data;
  }
);

const unfollow = createAsyncThunk<User, string>(
  "profile/unfollow",
  async (id) => {
    const response = await instance.delete(`api/followers/${id}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    clearError: (state) => {
      state.authUser.error = "";
    },
    resetUserData: () => {
      if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify({ event: "disconnect" }));
      }
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
      // send to WebSocket
      if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify({ event: "connect", userid: payload.user._id }));
      }
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
      localStorage.setItem("refreshToken", payload.refreshToken);
      // send to WebSocket
      if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify({ event: "connect", userid: payload.user._id }));
      }
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

    builder.addCase(editProfileUser.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(editProfileUser.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      Object.assign(store, {
        ...payload,
      });
    });
    builder.addCase(editProfileUser.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to edit user";
    });
    builder.addCase(addAvatarAsync.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(addAvatarAsync.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      store.authUser.profile.avatar = payload.profile?.avatar;
    });
    builder.addCase(addAvatarAsync.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to add avatar";
    });
    builder.addCase(addBannerAsync.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(addBannerAsync.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      store.authUser.profile.banner = payload.profile?.banner;
    });
    builder.addCase(addBannerAsync.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to add avatar";
    });

    builder.addCase(follow.pending, (store) => {
      store.followedUser.isLoading = true;
    });
    builder.addCase(follow.fulfilled, (store) => {
      store.followedUser.isLoading = false;
    });
    builder.addCase(follow.rejected, (store) => {
      store.followedUser.isLoading = false;
      store.followedUser.error = "Failed to fetch to follow user";
    });

    builder.addCase(unfollow.pending, (store) => {
      store.followedUser.isLoading = true;
    });
    builder.addCase(unfollow.fulfilled, (store) => {
      store.followedUser.isLoading = false;
    });
    builder.addCase(unfollow.rejected, (store) => {
      store.followedUser.isLoading = false;
      store.followedUser.error = "Failed to fetch to unfollow user";
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  registerUser,
  loginUser,
  fetchUser,
  editProfileUser,
  addAvatarAsync,
  addBannerAsync,
  follow,
  unfollow,
};

export default userSlice.reducer;
