import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  mySlots: [],
};

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.mySlots = null;
    },
    setSlots: (state, action) => {
      state.mySlots = action.payload.mySlots;
    },
    setUpdatedSlots: (state, action) => {
      const newSlot = action.payload.newSlot;
      state.mySlots.push(newSlot);
    },
  },
});

export const { setLogin, setLogout, setSlots, setUpdatedSlots } =
  docSlice.actions;

export default docSlice.reducer;
