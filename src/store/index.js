import { configureStore } from "@reduxjs/toolkit";
import { offerSlice, authSlice } from "./features";

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    auth: authSlice,
  },
});
