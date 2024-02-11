import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Section from './Section';
import '../css/employeesalary.css';

const EmployeeSalary = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salarySlip, setSalarySlip] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch('http://127.0.0.1:5000/employees')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  let user = employees.filter((employee) => employee.first_name === currentUser)[0];

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const salarySlipResponse = await axios.get(`http://localhost:5000/employee/get_salary_slip/${user.id}`);
        setSalarySlip(salarySlipResponse.data.salary_slip);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchSalaryData();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Section>
      <div className='salary-Section'>
        <h2>Employee Salary Details</h2>
        <div>
          <h3>Salary Slip</h3>
          {salarySlip && (
            <div>
              <p>Name: {salarySlip.name}</p>
              <p>Generation Date: {new Date(salarySlip.payroll_data.generation_date).toLocaleString()}</p>
              <p>Base Salary: Kshs {salarySlip.payroll_data.base_salary}</p>
              <p>Bonuses: {salarySlip.payroll_data.bonuses}</p>
              <p>Deductions: {salarySlip.payroll_data.deductions}</p>
              <p>Gross Pay: Kshs {salarySlip.payroll_data.gross_pay}</p>
              <p>Net Salary: Kshs {salarySlip.payroll_data.net_salary}</p>
            </div>
          )}

          <h3>Tax, Deductions, and Bonuses</h3>
          {salarySlip && (
            <div>
              <p>Bonuses Percentage: {salarySlip.payroll_data.bonuses_percentage * 100} %</p>
              <p>Deductions Percentage: {salarySlip.payroll_data.deductions_percentage * 100} %</p>
              <p>Tax Amount: Kshs {salarySlip.payroll_data.tax}</p>
              <p>Tax Percentage: {salarySlip.payroll_data.tax_percentage * 100} %</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default EmployeeSalary;

