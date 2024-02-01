import React from "react";
import Section from "./Section";

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
