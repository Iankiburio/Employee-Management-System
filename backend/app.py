from flask import Flask, request, jsonify
from datetime import datetime
from flask_migrate import Migrate
from models import db, Employee, Attendance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employee_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Calculate dynamic values for salary, deductions, bonuses, and taxes
def calculate_salary(employee):
    base_salary = employee.base_salary
    deductions_percentage = 0.1  # 10% deductions
    bonuses_percentage = 0.05    # 5% bonuses
    tax_percentage = 0.15        # 15% taxes
    
    employee.deductions = base_salary * deductions_percentage
    employee.bonuses = base_salary * bonuses_percentage
    employee.tax = base_salary * tax_percentage
    
    # Calculate net salary
    employee.net_salary = base_salary - employee.deductions + employee.bonuses - employee.tax

# Function to generate salary slip for an employee
def generate_salary_slip(employee):
    salary_slip = {
        'employee_id': employee.id,
        'name': employee.name,
        'salary': employee.base_salary,
        'deductions': employee.deductions,
        'bonuses': employee.bonuses,
        'net_salary': employee.net_salary
    }
    return salary_slip

# Admin routes

# Endpoint for the admin to process monthly payroll for all employees or a specific employee
@app.route('/admin/process_monthly_payroll', methods=['POST'])
def admin_process_monthly_payroll():
    data = request.get_json()

    if 'employee_id' in data:
        # Process payroll for a specific employee
        employee_id = data['employee_id']
        employee = Employee.query.get(employee_id)
        if employee:
            calculate_salary(employee)
            db.session.commit()
            return jsonify({'message': f'Monthly payroll processed successfully for employee {employee_id}'})
        else:
            return jsonify({'error': 'Employee not found'})
    else:
        # Process payroll for all employees
        employees = Employee.query.all()
        for employee in employees:
            calculate_salary(employee)
        db.session.commit()
        return jsonify({'message': 'Monthly payroll processed successfully for all employees'})

# Function to generate salary slips for all employees
def generate_salary_slips():
    employees = Employee.query.all()
    salary_slips = [generate_salary_slip(employee) for employee in employees]
    return salary_slips

# Endpoint for the admin to generate salary slips for all employees
@app.route('/admin/generate_salary_slips', methods=['POST'])
def admin_generate_salary_slips():
    salary_slips = generate_salary_slips()
    return jsonify({'salary_slips': salary_slips})

# Endpoint for the admin to generate payroll for a specific employee
@app.route('/admin/generate_payroll/<employee_id>', methods=['POST'])
def admin_generate_payroll_for_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        calculate_salary(employee)
        db.session.commit()
        return jsonify({'message': f'Payroll generated successfully for employee {employee_id}'})
    else:
        return jsonify({'error': 'Employee not found'})


# Endpoint for the admin to monitor employee attendance
@app.route('/admin/record_attendance', methods=['POST'])
def admin_record_attendance():
    data = request.get_json()
    employee_id = data.get('employee_id')
    clock_in_time = datetime.strptime(data.get('clock_in_time'), "%Y-%m-%d %H:%M:%S")
    clock_out_time = datetime.strptime(data.get('clock_out_time'), "%Y-%m-%d %H:%M:%S")

    # Save attendance data to the database
    attendance = Attendance(employee_id=employee_id, clock_in_time=clock_in_time, clock_out_time=clock_out_time)
    db.session.add(attendance)
    db.session.commit()

    return jsonify({'message': 'Attendance recorded successfully'})

# Endpoint for the admin to get attendance reports for a specific employee
@app.route('/admin/get_attendance_report/<employee_id>', methods=['GET'])
def admin_get_attendance_report(employee_id):
    # Retrieve attendance data for a specific employee from the database
    attendance_records = Attendance.query.filter_by(employee_id=employee_id).all()

    # Format the attendance records
    formatted_attendance = [{
        'clock_in_time': record.clock_in_time.strftime("%Y-%m-%d %H:%M:%S"),
        'clock_out_time': record.clock_out_time.strftime("%Y-%m-%d %H:%M:%S")
    } for record in attendance_records]

    return jsonify({'employee_id': employee_id, 'attendance': formatted_attendance})

# Employee routes

# Endpoint for the employee to get their salary slip
@app.route('/employee/get_salary_slip/<employee_id>', methods=['GET'])
def employee_get_salary_slip(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        salary_slip = generate_salary_slip(employee)
        return jsonify({'salary_slip': salary_slip})
    else:
        return jsonify({'error': 'Employee not found'})


if __name__ == '__main__':
    app.run(debug=True)
