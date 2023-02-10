import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
  error: "",
};

const TOKEN = "token";

const loginEndPoint = "http://localhost:8000/login/";
const userEndpoint = "http://localhost:8000/api/complaints/user/";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  const loginResponse = await axios.post(loginEndPoint, payload, {
    withCredentials: true,
  });

  window.localStorage.setItem(TOKEN, loginResponse.data.token);
  const headers = {
    Authorization: `Token ${loginResponse.data.token}`,
  };
  const userProfile = await axios.get(userEndpoint, {
    headers,
    withCredentials: true,
  });
  return userProfile.data;
});

export const tokenAuth = createAsyncThunk("auth/tokenAuth", async (payload) => {
  const headers = {
    Authorization: `Token ${payload}`,
  };
  const userProfile = await axios.get(userEndpoint, {
    headers,
  });
  return userProfile.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {});
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
    });
    builder.addCase(tokenAuth.pending, (state) => {});
    builder.addCase(tokenAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(tokenAuth.rejected, (state, action) => {
      state.user = {};
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions