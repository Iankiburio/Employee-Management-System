import React, { useEffect, useState } from "react";
import Section from "./Section";

import { FaEye } from "react-icons/fa";

import useaxios from "./../hooks/useaxios";

const EmployeeLeaveBalances = ({ type, onSelect }) => {
  const request = useaxios();

  const [data, setData] = useState({});

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await request({
      method: "GET",
      url: "employee/leave-balance/3",
    });

    if (res === "error") return;
    console.log(res);
    setData(res);
  }

  return (
    <Section>
      <div>
        <h2> My Leave Balances</h2>
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
              <td>{data?.annual_leave || "-"}</td>
              <td>{data?.annual_leave_entitled || "-"}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Study Leave</td>
              <td>{data?.study_leave || "-"}</td>
              <td>{data?.study_leave_entitled || "-"}</td>
              <td></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sick Leave</td>
              <td>{data?.sick_leave || "-"}</td>
              <td>{15}</td>
              <td></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Patternity Leave</td>
              <td>{data?.paternity_leave || "-"}</td>
              <td>{data?.paternity_leave_entitled || "-"}</td>
              <td></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Matternity Leave</td>
              <td>{data?.maternity_leave || "-"}</td>
              <td>{data?.maternity_leave_entitled || "-"}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default EmployeeLeaveBalances;
