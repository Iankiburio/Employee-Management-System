import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const PayrollPage = () => {
  const { employeeId } = useParams();
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editablePayroll, setEditablePayroll] = useState({
    base_salary: 0,
    bonuses: 0,
    deductions: 0,
  });

  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      // Fetch payroll data for the selected employee
      const response = await axios.get(`http://localhost:5000/admin/process_monthly_payroll/${employeeId}`);
      console.log('Payroll Data Response:', response.data);
      setPayrollData(response.data);
      // Set editablePayroll state with current payroll information
      setEditablePayroll(response.data?.employee_data?.payroll_data || {});
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

      console.log('Payroll Update Response:', response.data);

      // Fetch and update the payroll data
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
      setEditablePayroll(prevState => ({
        ...prevState,
        [name]: parseFloat(value) || 0, // Convert value to float or set to 0
      }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payroll Page</h2>
      {payrollData ? (
        <div>
          <h3>Employee Information</h3>
          <p>Name: {payrollData?.employee_data?.name}</p>

          {/* Editable Payroll Information */}
          <h3 className="mt-4">Edit Payroll Information</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="base_salary" className="form-label">Base Salary:</label>
              <input
                type="number"
                className="form-control"
                id="base_salary"
                name="base_salary"
                value={editablePayroll.base_salary}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {/* Payroll Data */}
          <h3>Payroll Data</h3>
          <p>Base Salary: {payrollData?.employee_data?.payroll_data?.base_salary ?? 'N/A'}</p>
          <p>Bonuses: {payrollData?.employee_data?.payroll_data?.bonuses ?? 'N/A'}</p>
          <p>Deductions: {payrollData?.employee_data?.payroll_data?.deductions ?? 'N/A'}</p>
          <p>Gross Pay: {payrollData?.employee_data?.payroll_data?.gross_pay ?? 'N/A'}</p>
          <p>Net Salary: {payrollData?.employee_data?.payroll_data?.net_salary ?? 'N/A'}</p>

          {/* Button to Generate Payroll */}
          <button className="btn btn-primary" onClick={generatePayroll} disabled={loading}>
            {loading ? 'Updating Payroll...' : 'Update Payroll'}
          </button>
        </div>
      ) : (
        <p>Loading payroll data...</p>
      )}
    </div>
  );
};

export default PayrollPage;
