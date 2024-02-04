import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salarySlip, setSalarySlip] = useState(null);
  const [taxDeductionsBonuses, setTaxDeductionsBonuses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch salary slip
        const salarySlipResponse = await axios.get(`http://localhost:5000/employee/get_salary_slip/1`);
        console.log('Salary Slip Response:', salarySlipResponse.data);
        setSalarySlip(salarySlipResponse.data);

        // Fetch tax, deductions, and bonuses
        const taxDeductionsBonusesResponse = await axios.get(`http://localhost:5000/employee/get_tax_deductions_bonuses/1`);
        console.log('Tax Deductions Bonuses Response:', taxDeductionsBonusesResponse.data);
        setTaxDeductionsBonuses(taxDeductionsBonusesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const postAttendance = async (status) => {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format to 'YYYY-MM-DD HH:mm:ss'

      // Ensure 'clock_in_time' and 'clock_out_time' are present in the request
      const data = {
        clock_in_time: status === 'clock-in' ? timestamp : undefined,
        clock_out_time: status === 'clock-out' ? timestamp : undefined,
      };

      const response = await axios.post(`http://localhost:5000/employee/attendance/1`, data);

      console.log(response.data.message);
      // If needed, you can update the state or perform other actions on successful attendance posting
      alert(`${status === 'clock-in' ? 'Clock in' : 'Clock out'} successful`);
    } catch (error) {
      console.error(`Error posting ${status} attendance:`, error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div>
        <h3>Salary Slip</h3>
        {salarySlip && (
          <div>
            <p>Name: {salarySlip.salary_slip.name}</p>
            <p>Base Salary: Kshs {salarySlip.salary_slip.base_salary}</p>
            <p>Bonuses: {salarySlip.salary_slip.bonuses}</p>
            <p>Deductions: {salarySlip.salary_slip.deductions}</p>
            <p>Gross Pay: {salarySlip.salary_slip.gross_pay}</p>
            <p>Net Salary: {salarySlip.salary_slip.net_salary}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Tax, Deductions, and Bonuses</h3>
        {taxDeductionsBonuses && (
          <div>
            <p>Bonuses Percentage: {taxDeductionsBonuses.tax_deductions_bonuses.bonuses_percentage} %</p>
            <p>Deductions Percentage: {taxDeductionsBonuses.tax_deductions_bonuses.deductions_percentage} %</p>
            <p>Tax Amount: {taxDeductionsBonuses.tax_deductions_bonuses.tax_amount}</p>
            <p>Tax Percentage: {taxDeductionsBonuses.tax_deductions_bonuses.tax_percentage} %</p>
          </div>
        )}
      </div>
      <div>
        <button onClick={() => postAttendance('clock-in')}>Clock In</button>
        <button onClick={() => postAttendance('clock-out')}>Clock Out</button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
