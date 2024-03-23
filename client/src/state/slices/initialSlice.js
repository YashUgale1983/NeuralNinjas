import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const iniSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = iniSlice.actions;

export default iniSlice.reducer;
