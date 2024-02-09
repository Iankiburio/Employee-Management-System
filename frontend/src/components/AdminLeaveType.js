import React from "react";
import Section from "./Section";

import { FaEye } from "react-icons/fa";

const LeaveType = ({ type, onSelect }) => {
  return (
    <Section>
    <div>
      <h2>Leave types</h2>
      <table className="w3-table-all" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Leave Type</th>
            <th>Entitlement</th>
            <th>Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Annual Leave</td>
            <td>30</td>
            <td>30</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Study Leave</td>
            <td>15</td>
            <td>15</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Sick Leave</td>
            <td>20</td>
            <td>20</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    </Section>
  );
};

export default LeaveType;
