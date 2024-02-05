import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import Section from "./Section";
import EmployeeLeaveBalances from "./EmployeeLeaveBalances";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/leaveRequestForm.css";

const LeaveRequestForm = () => {
  const navigate = useNavigate(); // Get the history object
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [difference, setDifference] = useState(null);

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //onSubmit(selectedType, startDate, endDate);
  };

  const calculateDifference = () => {
    if (startDate && endDate) {
      const differenceInMilliseconds = new Date(endDate) - new Date(startDate);
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      setDifference(Math.floor(differenceInDays));
    } else {
      setDifference(null);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    calculateDifference();
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    calculateDifference();
  };

  const handleBack = () => {
    navigate(-1); // Redirect to the leave requests page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" " style={{ backgroundColor: "white", padding: "10px" }}>
        <h2>Leave Application </h2>

        <div className="w3-row-padding w3-margin-bottom">
          <div className="w3-third">
            <label>Leave Type</label>
            <select
              className="w3-select w3-border"
              name="option"
              onChange={handleTypeSelect}
            >
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="1">Annual Leave</option>
              <option value="2">Study Leave</option>
              <option value="3">Sick Leave</option>
              <option value="4">Maternity</option>
              <option value="5">Paternity</option>
              <option value="6">Vacation</option>
            </select>
          </div>
          <div className="w3-third">
            <label>Start Date</label>
            <input
              className="w3-input w3-border"
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="w3-third">
            <label>End Date</label>
            <input
              className="w3-input w3-border"
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="w3-row-padding">
          <div className=" w3-third">
            <label>Return Date</label>
            <input
              className="w3-input w3-border"
              type="date"
              placeholder="Return Date"
              value={difference !== null ? difference : ""}
              disabled
            />
          </div>
          <div className=" w3-third">
            <label>Leave Balances</label>
            <input
              className="w3-input w3-border"
              type="number"
              value={5}
              disabled
            />
          </div>
          <div className=" w3-third"></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className=" w3-margin-top"
        >
          <button
            onClick={handleBack}
            className="w3-button w3-blue w3-rounded w3-margin-right w3-margin"
          >
            Back
          </button>

          <button
            type="submit"
            className="w3-button w3-teal w3-rounded w3-margin"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default LeaveRequestForm;
