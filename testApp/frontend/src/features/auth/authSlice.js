import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
  error: "",
};

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  const res1 = await axios.post("http://localhost:8000/login/", payload, {
    withCredentials: true,
  });
  window.localStorage.setItem("token", res1.data.token);
  const headers = {
    Authorization: `Token ${res1.data.token}`,
  };
  const res2 = await axios.get("http://localhost:8000/api/complaints/user/", {
    headers,
    withCredentials: true,
  });
  return res2.data;
});

export const tokenAuth = createAsyncThunk("auth/tokenAuth", async (payload) => {
  const headers = {
    Authorization: `Token ${payload}`,
  };
  const res = await axios.get("http://localhost:8000/api/complaints/user/", {
    headers,
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
