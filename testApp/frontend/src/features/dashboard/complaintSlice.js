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


const TOKEN = "token";

const allComplaintsEndPoint = "http://localhost:8000/api/complaints/"
const openCasesEndPoint = "http://localhost:8000/api/complaints/openCases/"
const closedCasesEndPoint = "http://localhost:8000/api/complaints/closedCases/"
const topComplaintsEndPoint = "http://localhost:8000/api/complaints/topComplaints/"
const constituentsEndPoint = "http://localhost:8000/api/complaints/constituents/"


export const fetchAllComplaints = createAsyncThunk(
  "complaints/fetchAllComplaints",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const headers = {
      Authorization: `Token ${token}`,
    };
    const allComplaints = await axios.get(allComplaintsEndPoint, {
      headers,
    });
    return allComplaints.data;
  }
);

export const fetchOpenCases = createAsyncThunk(
  "complaints/fetchOpenCases",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const headers = {
      Authorization: `Token ${token}`,
    };
    const openCases = await axios.get(
      openCasesEndPoint,
      {
        headers,
      }
    );
    return openCases.data;
  }
);

export const fetchClosedCases = createAsyncThunk(
  "complaints/fetchClosedCases",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const headers = {
      Authorization: `Token ${token}`,
    };
    const closedCases = await axios.get(
      closedCasesEndPoint,
      {
        headers,
      }
    );
    return closedCases.data;
  }
);

export const fetchTopComplaints = createAsyncThunk(
  "complaints/fetchTopComplaints",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const headers = {
      Authorization: `Token ${token}`,
    };
    const topComplaints = await axios.get(
      topComplaintsEndPoint,
      {
        headers,
      }
    );
    return topComplaints.data;
  }
);

export const fetchConstituents = createAsyncThunk(
  "complaints/fetchConstituents",
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    const headers = {
      Authorization: `Token ${token}`,
    };
    const constituents = await axios.get(
      constituentsEndPoint,
      {
        headers,
      }
    );
    return constituents.data;
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
