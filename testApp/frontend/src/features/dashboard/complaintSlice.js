import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  complaints: [],
  allComplaints: false,
  openComplaints: false,
  closedComplaints: false,
  topComplaints: false,
  constituents: false,

  error: "",
};

export const fetchAllComplaints = createAsyncThunk(
  "complaints/fetchAllComplaints",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get("http://localhost:8000/api/complaints/", {
      headers,
    });
    return response.data;
  }
);

export const fetchOpenCases = createAsyncThunk(
  "complaints/fetchOpenCases",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(
      "http://localhost:8000/api/complaints/openCases/",
      {
        headers,
      }
    );
    return response.data;
  }
);

export const fetchClosedCases = createAsyncThunk(
  "complaints/fetchClosedCases",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(
      "http://localhost:8000/api/complaints/closedCases/",
      {
        headers,
      }
    );
    return response.data;
  }
);

export const fetchTopComplaints = createAsyncThunk(
  "complaints/fetchTopComplaints",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(
      "http://localhost:8000/api/complaints/topComplaints/",
      {
        headers,
      }
    );
    return response.data;
  }
);

export const fetchConstituents = createAsyncThunk(
  "complaints/fetchConstituents",
  async () => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(
      "http://localhost:8000/api/complaints/constituents/",
      {
        headers,
      }
    );
    return response.data;
  }
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllComplaints.pending, (state) => {});
    builder.addCase(fetchAllComplaints.fulfilled, (state, action) => {
      state.complaints = action.payload;
      state.error = "";
      state.allComplaints = true;
      state.openComplaints = false;
      state.closedComplaints = false;
      state.topComplaints = false;
      state.constituents = false;
    });
    builder.addCase(fetchAllComplaints.rejected, (state, action) => {
      state.complaints = [];
    });
    builder.addCase(fetchOpenCases.pending, (state) => {});
    builder.addCase(fetchOpenCases.fulfilled, (state, action) => {
      state.complaints = action.payload;
      state.error = "";
      state.allComplaints = false;
      state.openComplaints = true;
      state.closedComplaints = false;
      state.topComplaints = false;
      state.constituents = false;
    });
    builder.addCase(fetchOpenCases.rejected, (state, action) => {
      state.complaints = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchClosedCases.pending, (state) => {});
    builder.addCase(fetchClosedCases.fulfilled, (state, action) => {
      state.complaints = action.payload;
      state.error = "";
      state.allComplaints = false;
      state.openComplaints = false;
      state.closedComplaints = true;
      state.topComplaints = false;
      state.constituents = false;
    });
    builder.addCase(fetchClosedCases.rejected, (state, action) => {
      state.complaints = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchTopComplaints.pending, (state) => {});
    builder.addCase(fetchTopComplaints.fulfilled, (state, action) => {
      state.complaints = action.payload;
      state.error = "";
      state.allComplaints = false;
      state.openComplaints = false;
      state.closedComplaints = false;
      state.topComplaints = true;
      state.constituents = false;
    });
    builder.addCase(fetchTopComplaints.rejected, (state, action) => {
      state.complaints = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchConstituents.pending, (state) => {});
    builder.addCase(fetchConstituents.fulfilled, (state, action) => {
      state.complaints = action.payload;
      state.error = "";
      state.allComplaints = false;
      state.openComplaints = false;
      state.closedComplaints = false;
      state.topComplaints = false;
      state.constituents = true;
    });
    builder.addCase(fetchConstituents.rejected, (state, action) => {
      state.complaints = [];
      state.error = action.error.message;
    });
  },
});

export default complaintSlice.reducer;
