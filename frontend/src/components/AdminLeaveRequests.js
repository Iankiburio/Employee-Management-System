import React from "react";
import Section from "./Section";
import { FaEye } from "react-icons/fa";

const LeaveRequests = () => {
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
                className="w3-yellow w3-text-black w3-round"
                style={{ padding: "5px" }}
              >
                pending
              </span>
            </td>
            <td>
              <span
                className=" "
                style={{ color: "black", fontSize: "18px", cursor: "pointer" }}
              >
                <FaEye />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
