import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import instance from "../../services/api";
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
  formData: FormData;
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
const addAvatar = createAsyncThunk<Partial<User>, EditAvatarRequest>(
  "users/profile/avatar",
  async ({ formData, userId }) => {
    const response = await instance.put(`api/users/${userId}`, formData);

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

const addFollower = createAsyncThunk<User, string>(
  "profile/followUser",
  async (followedUserId) => {
    const response = await instance.post("api/followers", {
      following: followedUserId,
    });
    return response.data;
  }
);

const deleteFollower = createAsyncThunk<User, string>(
  "profile/deleteFollower",
  async (id) => {
    const response = await instance.delete(`api/followers/${id}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    //  temporary reducers
    // addAvatar: (state, (payload: PayloadAction<FormData>)) => {
    //  state.profile.avatar = payload
    // },

    // addBanner: (state, (payload: PayloadAction<FormData>)) => {
    //  state.profile.banner = payload
    // },

    removeBanner: (state) => {
      state.authUser.profile.banner = undefined;
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
    builder.addCase(addAvatar.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(addAvatar.fulfilled, (store, { payload }) => {
      store.authUser.error = undefined;
      Object.assign(store, {
        ...payload,
      });
    });
    builder.addCase(addAvatar.rejected, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = "Failed to add avatar";
    });

    builder.addCase(addFollower.pending, (store) => {
      store.followedUser.isLoading = true;
    });
    builder.addCase(addFollower.fulfilled, (store, { payload }) => {
      store.followedUser = { ...payload };
      store.followedUser.isLoading = false;
    });
    builder.addCase(addFollower.rejected, (store) => {
      store.followedUser.isLoading = false;
      store.followedUser.error = "Failed to fetch to follow user";
    });

    builder.addCase(deleteFollower.pending, (store) => {
      store.followedUser.isLoading = true;
    });
    builder.addCase(deleteFollower.fulfilled, (store, { payload }) => {
      store.followedUser = { ...payload };
      store.followedUser.isLoading = false;
    });
    builder.addCase(deleteFollower.rejected, (store) => {
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
  addAvatar,
  addFollower,
  deleteFollower,
};

export default userSlice.reducer;
