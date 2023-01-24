import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../../api/axiosInstance";

const initialState = {
  user: null,
  accessToken: null,
};

export const loginApi = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      return response.data;
    } catch (err) {
      console.log(err, "err in login authSlice");
      return rejectWithValue(err.response);
    }
  }
);

export const logoutApi = createAsyncThunk(
  "/user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axiosInstance.delete("/user/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(data, response, "data");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserApi = createAsyncThunk(
  "user/update/me",
  async (data, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log(accessToken, "accesstoken -- ---");
      const response = await axiosInstance.patch("/user/me", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.status, "err in authSlice");
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: function (state, { payload }) {
      state.accessToken = payload;
    },
    setUser: function (state, { payload }) {
      state.user = payload;
    },
    setLiveAddress: function (state, { payload }) {
      state.user.liveAddress = {
        city: payload.city,
        coordinates: payload.coordinates,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      AsyncStorage.setItem("accessToken", payload.accessToken);
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      console.log(action, "action");
      // state.user = payload.user;
      // state.accessToken = payload.accessToken;
      // AsyncStorage.setItem("accessToken", payload.accessToken);
    });
    builder.addCase(updateUserApi.fulfilled, (state, { payload }) => {
      console.log(payload, "user while live address updating");
      state.user = payload.user;
    });
    builder.addCase(updateUserApi.rejected, (state, { payload }) => {
      state.accessToken = null;
      state.user = null;
      AsyncStorage.removeItem("accessToken");
    });
    builder.addCase(logoutApi.fulfilled, (state, data) => {
      console.log(state, data, 'state data');
      state.accessToken = null;
      state.user = null;
      AsyncStorage.removeItem("accessToken");
    });
    builder.addCase(logoutApi.rejected, (state, data) => {
      state.accessToken = null;
      state.user = null;
      AsyncStorage.removeItem("accessToken");
    });
  },
});

export const { setAccessToken, setUser, setLiveAddress } = authSlice.actions;

export default authSlice.reducer;
