import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
};

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setOffer: (state, action) => {
      state.offers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOffer } = counterSlice.actions;

export default offerSlice.reducer;
