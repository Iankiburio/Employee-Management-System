// LeaveType.js
import React from 'react';

const LeaveType = ({ type, onSelect }) => {
  return (
    <div>
      <label>
        <input type="radio" name="leaveType" value={type} onChange={onSelect} />
        {type}
      </label>
    </div>
  );
};

export default LeaveType;
