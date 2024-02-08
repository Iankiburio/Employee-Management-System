import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const EmployeeLeaveRequest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/leave-requests/3", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result?.leave_requests || []);
      })
      .catch((error) => console.log("error", error));
  }

  function getDays(startDate, endDate) {
    let stDate = new Date(startDate);
    let enDate = new Date(endDate);

    stDate = stDate.getTime();
    enDate = enDate.getTime();

    const diffMs = enDate - stDate;

    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days;
  }

  //updated employee leave

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <button
          className="w3-btn w3-round-large w3-green"
          style={{ fontSize: "20px" }}
          onClick={() => navigate("add")}
        >
          New Leave Request
        </button>
      </div>
      <h2>Leave Application History</h2>
      <table className="w3-table-all" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Return Date</th>
            <th>Applied Days</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc, index) => {
            return (
              <tr>
                <td>{doc?.id || ""}</td>
                <td>{doc?.leave_type?.leave_description || ""}</td>
                <td>{doc?.start_date || ""}</td>
                <td>{doc?.end_date || ""}</td>
                <td>{doc?.Return_date || ""}</td>
                <td>{getDays(doc.start_date, doc.end_date) || "0"}</td>
                <td>{doc?.leave_balances || ""} </td>
                <td>
                  <span
                    className="w3-yellow w3-text-black w3-round"
                    style={{ padding: "5px" }}
                  >
                    {doc?.status || ""}
                  </span>
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td>1</td>
            <td>Annual Leave</td>
            <td>12/03/2024</td>
            <td>12/07/2024</td>
            <td>12/08/2024</td>
            <td>5</td>
            <td>10</td>
            <td>
              <span
                className="w3-yellow w3-text-black w3-round"
                style={{ padding: "5px" }}
              >
                pending
              </span>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveRequest;
