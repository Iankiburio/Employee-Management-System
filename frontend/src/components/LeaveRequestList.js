// LeaveRequestList.js
import React from "react";
import "../css/leaveRequestList.css";

const LeaveRequestList = ({ requests, onApprove, onReject }) => {
  return (
    <div>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            {request.type} - {request.startDate.toDateString()} to{" "}
            {request.endDate.toDateString()}
            {request.status === "pending" && (
              <>
                <button onClick={() => onApprove(index)}>Approve</button>
                <button onClick={() => onReject(index)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequestList;
