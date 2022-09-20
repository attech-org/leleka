import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    //  temporary reducers
    removeBanner: (state) => {
      state.profile.banner = undefined;
    },
    clearError: (state) => {
      state.error = "";
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
      Object.assign(store, {
        ...userInitialState,
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
      Object.assign(store, {
        ...userInitialState,
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
      store.isLoading = false;
      store.error = "Failed to login user";
    });

    builder.addCase(editProfileUser.pending, (store) => {
      store.isLoading = true;
    });
    builder.addCase(editProfileUser.fulfilled, (store, { payload }) => {
      store.error = undefined;
      Object.assign(store, {
        ...payload,
      });
    });
    builder.addCase(editProfileUser.rejected, (store) => {
      store.isLoading = false;
      store.error = "Failed to edit user";
    });
    builder.addCase(addAvatar.pending, (store) => {
      store.isLoading = true;
    });
    builder.addCase(addAvatar.fulfilled, (store, { payload }) => {
      store.error = undefined;
      Object.assign(store, {
        ...payload,
      });
    });
    builder.addCase(addAvatar.rejected, (store) => {
      store.isLoading = false;
      store.error = "Failed to add avatar";
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  registerUser,
  loginUser,
  editProfileUser,
  addAvatar,
};

export default userSlice.reducer;
