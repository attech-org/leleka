import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PWAInfo {
  message: string;
}

const initialState: PWAInfo = {
  message: "",
};

const pwaInfoSlice = createSlice({
  name: "PWAInfo",
  initialState,

  reducers: {
    setPWAMessage(state, action: PayloadAction<string>) {
      // it's okay to do this because immer makes it immutable
      // under the hood
      state.message = action.payload;
    },

    cleanPWAMessage(state) {
      state.message = "";
    },
  },
});

export const pwaActions = { ...pwaInfoSlice.actions };

export default pwaInfoSlice.reducer;
