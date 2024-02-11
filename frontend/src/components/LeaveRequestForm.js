import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "./Section";
import EmployeeLeaveRequests from "./EmployeeLeaveRequests";
import EmployeeLeaveBalances from "./EmployeeLeaveBalances";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/leaveRequestForm.css";

const LeaveRequestForm = ({currentUser}) => {

  const [employees, setEmployees] = useState([]);

    const fetchEmployees = () => {
        fetch('http://127.0.0.1:5000/employees')
          .then((response) => response.json())
          .then((data) => {
            console.log('API Response:', data);
            setEmployees(data.employees); // Update the employees state with fetched data
          })
          .catch((error) => {
            console.error('Error fetching employees:', error);
          });
      };
      
    useEffect(()=>{
        fetchEmployees()
      },[]);
  
  let user = employees.filter(employees => employees.first_name===currentUser);
  console.log(user)

  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [difference, setDifference] = useState(null);
  const [returnDate, setReturnDate] = useState("");

  console.log("selectedType", selectedType);
  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLeaveRequest();
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
    const selectedEndDate = new Date(event.target.value);
    setEndDate(selectedEndDate.toISOString().split("T")[0]);

    // Calculate return date based on end date
    let returnDate = new Date(selectedEndDate);

    // Check if end date is between Monday and Thursday
    if (returnDate.getDay() >= 1 && returnDate.getDay() <= 4) {
      // If between Monday and Thursday, add one day to the end date
      returnDate.setDate(selectedEndDate.getDate() + 1);
    } else if (returnDate.getDay() === 5) {
      // Friday
      // If it's Friday, set return date to the next Monday
      returnDate.setDate(selectedEndDate.getDate() + 3); // Add 3 days to skip Saturday and Sunday
    } else {
      // If not between Monday and Thursday, find the next weekday
      while (returnDate.getDay() === 0 || returnDate.getDay() === 6) {
        returnDate.setDate(returnDate.getDate() + 1);
      }
    }

    const formattedReturnDate = returnDate.toISOString().split("T")[0]; // Format as yyyy-mm-dd

    setReturnDate(formattedReturnDate);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const submitLeaveRequest = () => {
    // validation front end.

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      leavetype_ID: selectedType,
      start_date: startDate,
      end_date: endDate,
      status: "Pending",
      admin_comment: "",
      action: "Approve",
      Return_date: returnDate,
      leave_balances: "20",
      employee_ID: 3,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/leave-requests", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/employee/leave-requests");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Section>
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
          <div className="w3-third">
            <label>Return Date</label>
            <input
              className="w3-input w3-border"
              type="date"
              placeholder="Return Date"
              value={returnDate}
              disabled
            />
          </div>
          <div className="w3-third">
            <label>Leave Balances</label>
            <input
              className="w3-input w3-border"
              type="number"
              value={5}
              disabled
            />
          </div>
          <div className="w3-third"></div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="w3-margin-top"
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
            onClick={submitLeaveRequest}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    </Section>
  );
};

export default LeaveRequestForm;
