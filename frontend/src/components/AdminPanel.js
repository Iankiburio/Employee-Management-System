// AdminPanel.js
import React, { useState } from 'react';
import LeaveRequestList from './LeaveRequestList';
import '../css/adminpanel.css'

const AdminPanel = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [comments, setComments] = useState([]);

  const handleLeaveRequest = (type, startDate, endDate) => {
    const newRequest = {
      type,
      startDate,
      endDate,
      status: 'pending', // Set status to pending initially
    };
    setLeaveRequests([...leaveRequests, newRequest]);
  };

  const handleApprove = (index) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests[index].status = 'approved';
    setLeaveRequests(updatedRequests);
  };

  const handleReject = (index) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests[index].status = 'rejected';
    setLeaveRequests(updatedRequests);
  };

  const handleComment = (index, comment) => {
    const updatedComments = [...comments];
    updatedComments[index] = comment;
    setComments(updatedComments);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <LeaveRequestList
        requests={leaveRequests}
        comments={comments}
        onApprove={handleApprove}
        onReject={handleReject}
        onComment={handleComment}
      />
    </div>
  );
};

export default AdminPanel;
