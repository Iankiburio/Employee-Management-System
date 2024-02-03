import React, { useState } from "react";
import Section from "./Section";
import { FaEye } from "react-icons/fa";

import BasicModal from "./Modals/BasicModal";

const LeaveRequests = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("pending");

  const [employeeDetails, setEmployeeDetails] = useState({
    id: 1,
    leave_type: "Anual Leave",
    start_date: "12/03/2032",
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleApprove = () => {
    setStatus("approved");
    // Add logic for approve action
  };

  const handleReject = () => {
    setStatus("rejected");
    // Add logic for reject action
  };

  return (
    <div>
      <table className="w3-table-all" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Applied Days</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Action</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Annual Leave</td>
            <td>12/03/2032</td>
            <td>12/03/2032</td>
            <td>5</td>
            <td>10</td>
            <td>
              <span
                className={`w3-yellow w3-text-black w3-round ${
                  status === "pending" ? "pending" : ""
                }`}
                style={{ padding: "5px" }}
              >
                {status}
              </span>
            </td>
            <td>
              <span
                className=" "
                style={{ color: "black", fontSize: "18px", cursor: "pointer" }}
                onClick={() => setShowDetails(true)}
              >
                <FaEye />
              </span>
            </td>
            <td>{comment}</td>
          </tr>
        </tbody>
      </table>
      <div className=" w3-container">
        <BasicModal
          mh="Employee Leave Request"
          mf="Update employee leave request"
          showModal={showDetails}
          setShowModal={setShowDetails}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div>
              <div>
                <strong>Details:</strong>
                <ul>
                  <li>
                    <strong>#Id:</strong> 1
                  </li>
                  <li>
                    <strong>Leave Type:</strong> Annual Leave
                  </li>
                  <li>
                    <strong>Start Date:</strong> 12/03/2032
                  </li>
                  <li>
                    <strong>End Date:</strong> 12/03/2032
                  </li>
                  <li>
                    <strong>Applied Days:</strong> 5
                  </li>
                  <li>
                    <strong>Balance:</strong> 10
                  </li>
                  <li>
                    <strong>Status:</strong> {status}
                  </li>
                </ul>
              </div>
              <div>
                <button className="w3-teal" onClick={handleApprove}>
                  Approve
                </button>
                <button className="w3-red" onClick={handleReject}>
                  Reject
                </button>
              </div>
              <div>
                <textarea
                  placeholder="Add comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </div>
        </BasicModal>
      </div>
    </div>
  );
};

export default LeaveRequests;
