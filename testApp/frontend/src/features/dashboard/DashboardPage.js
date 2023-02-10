import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "../table/Table";
import {
  fetchAllComplaints,
  fetchOpenCases,
  fetchClosedCases,
  fetchTopComplaints,
  fetchConstituents,
} from "./complaintSlice";
import { tokenAuth, logout } from "../auth/authSlice";

const DashboardPage = () => {
  const complaintData = useSelector(
    ({ complaints: { complaints } }) => complaints
  );
  const user = useSelector((state) => state.auth.user);
  const allComplaints = useSelector((state) => state.complaints.allComplaints);
  const openComplaints = useSelector(
    (state) => state.complaints.openComplaints
  );
  const closedComplaints = useSelector(
    (state) => state.complaints.closedComplaints
  );
  const topComplaints = useSelector((state) => state.complaints.topComplaints);
  const token = useSelector((state) => state.auth.token);

  const constituents = useSelector((state) => state.complaints.constituents);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const lSToken = localStorage.getItem("token");
    if (!lSToken && !token) {
      navigate("/");
    }
    if (lSToken && !isAuthenticated) {
      dispatch(tokenAuth(lSToken));
    }
    if (
      !allComplaints &&
      !openComplaints &&
      !closedComplaints &&
      !topComplaints &&
      !constituents
    ) {
      dispatch(fetchAllComplaints());
    }
  }, [
    dispatch,
    user,
    isAuthenticated,
    token,
    allComplaints,
    openComplaints,
    closedComplaints,
    topComplaints,
    constituents,
    navigate,
  ]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "25%",
          height: "100vh",
          backgroundColor: "#eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          overflowY: "auto",
          position: "fixed",
          overflowX: "hidden",
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Navigation Bar</h3>
        <div style={{ width: "100%", bottom: "50vh", alignContent: "center" }}>
          <button
            onClick={() => dispatch(fetchAllComplaints())}
            disabled={allComplaints}
            style={{ width: "100%" }}
          >
            Show All Complaints
          </button>
          <button
            onClick={() => dispatch(fetchOpenCases())}
            disabled={openComplaints}
            style={{ width: "100%" }}
          >
            Show Open Complaint Cases
          </button>
          <button
            onClick={() => dispatch(fetchClosedCases())}
            disabled={closedComplaints}
            style={{ width: "100%" }}
          >
            Show Closed Complaint Cases
          </button>
          <button
            onClick={() => dispatch(fetchTopComplaints())}
            disabled={topComplaints}
            style={{ width: "100%" }}
          >
            Show Top 3 Complaint Types
          </button>
          <button
            onClick={() => dispatch(fetchConstituents())}
            disabled={constituents}
            style={{ width: "100%" }}
          >
            Show Complaints by My Constituents
          </button>
        </div>
        <button
          style={{ top: "30%", position: "relative" }}
          onClick={() => {
            dispatch(logout())
            window.localStorage.clear();
            navigate("/");

            return;
          }}
        >
          Logout
        </button>
      </div>
      <div
        style={{
          width: "75%",
          height: "100vh",
          padding: "20px",
          marginLeft: "25%",
        }}
      >
        <h1>
          Welcome to the Dashboard, {user.first_name ? user.first_name : "User"}
          !
        </h1>
        <Table tableData={!complaintData.length ? [] : complaintData} />
      </div>
    </div>
  );
};

export default DashboardPage;
