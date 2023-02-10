import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import complaintReducer from "../features/complaints/complaintSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintReducer,
  },
});

export default store;
