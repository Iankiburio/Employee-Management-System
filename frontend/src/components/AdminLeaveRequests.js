import React, { useState, useEffect } from "react";
import Section from "./Section";
import { FaEye } from "react-icons/fa";

import BasicModal from "./Modals/BasicModal";

import useaxios from "../hooks/useaxios";

function getDays(startDate, endDate) {
  let stDate = new Date(startDate);
  let enDate = new Date(endDate);

  stDate = stDate.getTime();
  enDate = enDate.getTime();

  const diffMs = enDate - stDate;

  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return days;
}

const LeaveRequests = () => {
  const [data, setData] = useState([]);

  const request = useaxios();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await request({
      method: "GET",
      url: "leave-requests",
    });

    if (res === "error") {
      return;
    }

    setData(res || []);
  }

  return (
    <div>
      <h2>Leave Requests</h2>
      <table className="w3-table-all" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Employee</th>
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
          {data.map((doc, i) => {
            return <LeaveRow doc={doc} key={doc?.id || i} init={init} />;
          })}
        </tbody>
      </table>
      <div className=" w3-container"></div>
    </div>
  );
};

const LeaveRow = ({ doc, init }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {" "}
      <tr>
        <td>{doc.id}</td>
        <td>
          {doc?.employee?.first_name} {doc?.employee?.last_name}
        </td>
        <td>{doc?.leave_type?.leave_description || ""}</td>
        <td>{doc?.start_date || ""}</td>
        <td>{doc?.end_date || ""}</td>
        <td>{getDays(doc.start_date, doc.end_date)}</td>
        <td>{doc?.leave_balances}</td>
        <td>
          <span>{doc.status}</span>
        </td>
        <td>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
          >
            <FaEye />
            <span style={{ marginLeft: "8px" }}>{doc.action}</span>
          </span>
        </td>
      </tr>
      <LeaveModal
        doc={doc}
        showModal={showModal}
        setShowModal={setShowModal}
        init={init}
      />
    </>
  );
};

const LeaveModal = ({ showModal, setShowModal, doc, init }) => {
  const [comment, setComment] = useState("");

  const request = useaxios();

  async function approve() {
    let res = await request({
      url: "leave-request/update",
      method: "PUT",
      body: {
        id: doc.id,
        status: "approved",
        admin_comment: comment || "",
      },
    });

    if (res === "error") return;
    await init();
    setShowModal(false);
  }

  async function reject() {
    let res = await request({
      url: "leave-request/update",
      method: "PUT",
      body: {
        id: doc.id,
        status: "reject",
        admin_comment: comment || "",
      },
    });

    if (res === "error") return;
    await init();
    setShowModal(false);
  }

  return (
    <BasicModal
      mh="Employee Leave Request"
      mf="Update employee leave request"
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div style={{ width: "100%" }}>
        <div className=" w3-ul w3-xlarge " style={{ width: "100%" }}>
          <ListItem
            txt1="Employee"
            txt2={`${doc?.employee?.first_name} ${doc?.employee?.last_name}`}
          />
          <ListItem
            txt1="Leave Type"
            txt2={doc?.leave_type?.leave_description}
          />
          <ListItem txt1="Start Date" txt2={doc?.start_date} />
          <ListItem
            txt1="Applied Days"
            txt2={getDays(doc.start_date, doc.end_date)}
          />
          <ListItem txt1="Comments" txt2={doc?.admin_comment || ""} />
          <ListItem txt1="Applied Days" txt2={doc?.leave_balances} />
          <ListItem txt1="Balance" txt2={doc?.leave_balances} />
          <ListItem txt1="Status" txt2={doc?.status} />
        </div>

        <div style={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}>
          <textarea
            className=" w3-input w3-border "
            placeholder="Add comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div class="w3-bar " style={{ width: "100%", marginBottom: "8px" }}>
          <button
            class="w3-bar-item w3-button w3-teal"
            style={{ width: "50%" }}
            onClick={approve}
          >
            Approve
          </button>
          <button
            class="w3-bar-item w3-button w3-red"
            style={{ width: "50%" }}
            onClick={reject}
          >
            Reject
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

const ListItem = ({ txt1, txt2 }) => {
  return (
    <li>
      <span className=" w3-opacity">{txt1}</span>:<span>{txt2}</span>
    </li>
  );
};

export default LeaveRequests;
