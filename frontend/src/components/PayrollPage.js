import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/payrollpage.css';
import Section from './Section';

const PayrollPage = () => {
  const { employeeId } = useParams();
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editablePayroll, setEditablePayroll] = useState({
    base_salary: 0,
  });

  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      // Fetch payroll data for the selected employee
      const response = await axios.get(`http://localhost:5000/employee/get_salary_slip/${employeeId}`);
      console.log('Payroll Data Response:', response.data);
      setPayrollData(response.data?.salary_slip || {});
      // Set editablePayroll state with current payroll information
      setEditablePayroll(response.data?.salary_slip?.payroll_data || {});
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePayroll = async () => {
    setLoading(true);
  
    try {
      // Send a POST request to update the payroll data for the selected employee
      const response = await axios.post(`http://localhost:5000/admin/update_payroll/${employeeId}`, {
        base_salary: editablePayroll.base_salary,
      });
  
      // Fetch and update the payroll data, passing update_generation_date as true
      await fetchPayrollData();
    } catch (error) {
      console.error('Error updating payroll data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Initial fetch of payroll data
    fetchPayrollData();
  }, [employeeId]);

  // Handle changes in the editable payroll information
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Only update the base salary
    if (name === 'base_salary') {
      setEditablePayroll((prevState) => ({
        ...prevState,
        [name]: parseFloat(value) || 0, // Convert value to float or set to 0
      }));
    }
  };

  function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
  }


  return (
    <Section>
    <div className="salary-container mt-4">
      {payrollData ? (
        <div>
          <h3>Employee Information</h3>
          <p>Name: {payrollData.name}</p>
          <p>Date: {payrollData.payroll_data?.generation_date}</p>

          {/* Payroll Data */}
          <h3 className="mt-4">Payroll Data</h3>
          <p>Base Salary: Kshs {formatNumber(payrollData.payroll_data?.base_salary)}</p>
          <p>Bonuses:Kshs {formatNumber(payrollData.payroll_data?.bonuses)}</p>
          <p>Deductions: Kshs {formatNumber(payrollData.payroll_data?.deductions)}</p>
          <p>Tax:Kshs {formatNumber(payrollData.payroll_data?.tax)}</p>
          <p>Gross Pay: Kshs {formatNumber(payrollData.payroll_data?.gross_pay)}</p>
          <p>Net Salary: Kshs {formatNumber(payrollData.payroll_data?.net_salary)}</p>
          

         {/* Editable Payroll Information */}
        <h3 className="mt-4">Edit Payroll Information</h3>
          <form>
           <div className="mb-3">
            <label htmlFor="base_salary" className="salary-form-label">
              Base Salary:
            </label>
             <input
              type="number"
              className="salary-form-control"
              id="base_salary"
              name="base_salary"
              value={editablePayroll.base_salary}
              onChange={handleInputChange}
              style={{ width: '150px' }} 
             />
          </div>
         </form>


          {/* Button to Generate Payroll */}
         <button className="btn btn-primary" onClick={generatePayroll} disabled={loading} style={{ width: '150px' }}>
         {loading ? 'Updating Payroll...' : 'Update Payroll'}
         </button>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Section>
  );
};

export default PayrollPage;
