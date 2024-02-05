import React from "react";

const AdminApprovalPage = ({ onApprove, onReject }) => {
  const handleApprove = () => {
    onApprove();
  };

  const handleReject = () => {
    onReject();
  };

  return (
    <div>
      <h2>Leave Approval</h2>
      <div>
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default AdminApprovalPage;
