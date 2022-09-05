import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types";
export interface UserStore extends Partial<User> {
  username: string;
  password: string; // Is it needed?
  name: string;
  location?: string;
  url?: string;
  description?: string;
  verified: boolean;
  followersCount: number;
  friendsCount: number;
  listedCount: number;
  favouritesCount: number;
  statusesCount: number;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    gender?: string;
  };
  auth?: {
    local?: {
      accessToken?: string;
      refreshToken?: string;
    };
    twitter?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };
}

const userInitialState: UserStore = {
  username: "",
  password: "",
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
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData: (state, data: PayloadAction<Partial<UserStore>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
      return { ...state, ...data.payload };
    },

    resetUserData: () => {
      return userInitialState;
    },
  },
});

export const userActions = { ...userSlice.actions };

export default userSlice.reducer;
