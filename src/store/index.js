import { configureStore } from "@reduxjs/toolkit";
import { offerSlice } from "./features";

export const store = configureStore({
  reducer: {
    offerSlice,
  },
});
