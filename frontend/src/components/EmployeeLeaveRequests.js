import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const EmployeeLeaveRequest = () => {
  const navigate = useNavigate();

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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Maternity</td>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveRequest;
