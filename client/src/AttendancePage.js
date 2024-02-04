import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendancePage = () => {
  const { employeeId } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch attendance data for the selected employee
        const response = await axios.get(`http://localhost:5000/admin/monitor_attendance/${employeeId}`);
        
        console.log('Attendance data response:', response.data);

        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Error fetching attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  return (
    <div className="container mt-4">
      {loading && <p>Loading attendance data...</p>}

      {error && <p className="text-danger">{error}</p>}

      {attendanceData && (
        <div>
          <h3 className="mb-3">Attendance Data</h3>
          <ul className="list-group">
            {attendanceData.attendance.map((record, index) => (
              <li key={index} className="list-group-item">
                {record.clock_in_time && <p>Clock In: {record.clock_in_time}</p>}
                {record.clock_out_time && <p>Clock Out: {record.clock_out_time}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
