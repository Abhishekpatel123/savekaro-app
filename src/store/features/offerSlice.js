import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../../api/axiosInstance";
import { STATUS } from "../../constants";

const initialState = {
  offers: [],
  categories: [],
  bookings: [],
  alert: null, // { message: "", type: STATUS.success,}
};

export const fetchOfferApi = createAsyncThunk(
  "/shopkeeper/offers",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axiosInstance.get("/offers", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (err) {
      console.log(err, "erer");
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShopCategoriesApi = createAsyncThunk(
  "/shopkeeper/shop-categories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/shopkeeper/shop-categories");
      return response.data;
    } catch (err) {
      console.log(err, "erer");
      return rejectWithValue(err.response.data);
    }
  }
);

export const bookOfferApi = createAsyncThunk(
  "/offers/book",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axiosInstance.post("/offers/bookings", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (err) {
      console.log(err, "erer");
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchBookingsApi = createAsyncThunk(
  "/offers/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axiosInstance.get(
        `/offers/bookings?status=${data}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err, "erer");
      return rejectWithValue(err.response.data);
    }
  }
);

export const cancelBookingsApi = createAsyncThunk(
  "/offers/booking/cancel",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axiosInstance.patch(
        "/offers/bookings/cancel",
        data,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch (err) {
      console.log(err, "erer");
      return rejectWithValue(err.response.data);
    }
  }
);

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOfferApi.fulfilled, (state, { payload }) => {
      state.offers = payload.offers;
    });
    builder.addCase(fetchShopCategoriesApi.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
    });
    builder.addCase(bookOfferApi.fulfilled, (state, { payload }) => {
      state.alert = { message: payload.message, type: STATUS.success };
    });
    builder.addCase(fetchBookingsApi.fulfilled, (state, { payload }) => {
      // state.alert = { message: payload.message, type: STATUS.success };
      state.bookings = payload.bookings;
    });
    builder.addCase(fetchBookingsApi.rejected, (state, { payload }) => {
      console.log(payload, "error booking");
      state.alert = {
        message: "Your are not authorized to",
        type: STATUS.error,
      };
      // state.bookings = payload.bookings;
    });
    builder.addCase(cancelBookingsApi.fulfilled, (state, { payload }) => {
      // state.alert = { message: payload.message, type: STATUS.success };
      state.bookings = payload.bookings;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setOffers } = offerSlice.actions;

export default offerSlice.reducer;
