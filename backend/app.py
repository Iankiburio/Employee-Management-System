from flask import Flask, request, jsonify
from datetime import datetime
from flask_migrate import Migrate
from flask_cors import cross_origin, CORS
from models import db, Employee, Attendance, Payroll

app = Flask(__name__)
cors = CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employee_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
migrate = Migrate(app, db)


# Function to calculate dynamic values for salary, deductions, bonuses, and taxes
def calculate_salary_components(base_salary, deductions_percentage, bonuses_percentage, tax_percentage):
    deductions = base_salary * deductions_percentage
    bonuses = base_salary * bonuses_percentage
    tax = base_salary * tax_percentage

    # Calculate gross pay
    gross_pay = base_salary + bonuses

    # Calculate net salary
    net_salary = gross_pay - deductions - tax

    return deductions, bonuses, tax, gross_pay, net_salary

# Function to calculate salary components for a payroll entry
def calculate_salary(payroll):
    base_salary = payroll.base_salary
    deductions_percentage = payroll.deductions_percentage
    bonuses_percentage = payroll.bonuses_percentage
    tax_percentage = payroll.tax_percentage

    deductions, bonuses, tax, gross_pay, net_salary = calculate_salary_components(
        base_salary, deductions_percentage, bonuses_percentage, tax_percentage
    )

    # Update payroll entry
    payroll.deductions = deductions
    payroll.bonuses = bonuses
    payroll.tax = tax
    payroll.gross_pay = gross_pay
    payroll.net_salary = net_salary

# Function to generate salary slip for a payroll entry
def generate_salary_slip(payroll):
    return {
        'employee_id': payroll.employee.id,
        'name': payroll.employee.name,
        'base_salary': payroll.base_salary,
        'bonuses': payroll.bonuses,
        'gross_pay': payroll.gross_pay,
        'deductions': payroll.deductions,
        'net_salary': payroll.net_salary
    }

# Function to process monthly payroll for an employee
def process_monthly_payroll_employee(employee):
    # Retrieve the latest payroll entry for the employee
    payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)

    if payroll:
        # Calculate salary components
        calculate_salary(payroll)

        # Commit changes to the database
        db.session.commit()

        # Generate salary slip
        salary_slip = generate_salary_slip(payroll)

        return {'message': f'Monthly payroll processed successfully for employee {employee.id}',
                'salary_slip': salary_slip}
    else:
        return {'error': 'Payroll entry not found'}

# Function to process monthly payroll for all employees
def process_monthly_payroll_all_employees():
    employees = Employee.query.all()
    salary_slips = []

    for employee in employees:
        result = process_monthly_payroll_employee(employee)
        if 'error' in result:
            return result  

        salary_slips.append(result['salary_slip'])

    return {'message': 'Monthly payroll processed successfully for all employees', 'salary_slips': salary_slips}


# Admin dashboard endpoint to get a list of all employees
@app.route('/admin/get_all_employees', methods=['GET'])
def admin_get_all_employees():
    employees = Employee.query.all()
    employee_names = [{'employee_id': employee.id, 'employee_name': employee.name} for employee in employees]

    return jsonify({'employee_names': employee_names})

# Admin dashboard endpoint to get detailed data for a specific employee
@app.route('/admin/get_employee_data/<employee_id>', methods=['GET'])
def admin_get_employee_data(employee_id):
    employee = Employee.query.get(employee_id)

    if employee:
        # Retrieve the latest payroll entry for the employee
        latest_payroll = (
            Payroll.query
            .filter_by(employee_id=employee.id, month=datetime.now().month, year=datetime.now().year)
            .first()
        )

        if latest_payroll:
            calculate_salary(latest_payroll)
            employee_data = {
                'employee_id': employee.id,
                'employee_name': employee.name,
                'tax_percentage': latest_payroll.tax_percentage,
                'deductions_percentage': latest_payroll.deductions_percentage,
                'bonuses_percentage': latest_payroll.bonuses_percentage,
                'tax_amount': latest_payroll.tax,
                'deductions_amount': latest_payroll.deductions,
                'bonuses_amount': latest_payroll.bonuses
            }
            return jsonify({'employee_data': employee_data})
        else:
            return jsonify({'error': 'Payroll entry not found'})
    else:
        return jsonify({'error': 'Employee not found'})

# Existing

# Endpoint for the admin to process monthly payroll for all employees
@app.route('/admin/process_monthly_payroll_all', methods=['POST', 'GET'])
def admin_process_monthly_payroll_all():
    if request.method == 'POST':
        # Process payroll for all employees
        result = process_monthly_payroll_all_employees()
        if 'error' in result:
            return result

        salary_slips = result['salary_slips']

        return jsonify({'message': 'Monthly payroll processed successfully for all employees',
                        'salary_slips': salary_slips})

    elif request.method == 'GET':
        # Retrieve all data for all employees
        employees = Employee.query.all()
        all_data = []

        for employee in employees:
            # Retrieve the latest payroll entry for each employee
            payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)

            if payroll:
                calculate_salary(payroll)
                # Generate salary slip
                salary_slip = generate_salary_slip(payroll)

                employee_data = {
                    'employee_id': employee.id,
                    'name': employee.name,
                    'payroll_data': salary_slip
                }
                all_data.append(employee_data)

        return jsonify({'all_data': all_data})
    else:
        return jsonify({'error': 'Method not allowed'})

# Endpoint for the admin to process monthly payroll for a specific employee
@app.route('/admin/process_monthly_payroll/<employee_id>', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def admin_process_monthly_payroll_employee(employee_id):
    if request.method == 'POST':
        # Process payroll for a specific employee
        employee = Employee.query.get(employee_id)
        
        if employee:
            # Retrieve the latest payroll entry for the employee
            payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)

            if payroll:
                calculate_salary(payroll)
                db.session.commit()

                # Generate salary slip
                salary_slip = generate_salary_slip(payroll)

                return jsonify({'message': f'Monthly payroll processed successfully for employee {employee_id}',
                                'salary_slip': salary_slip})
            else:
                return jsonify({'error': 'Payroll entry not found'})
        else:
            return jsonify({'error': 'Employee not found'})

    elif request.method == 'GET':
        # Retrieve all data for a specific employee
        employee = Employee.query.get(employee_id)

        if employee:
            # Retrieve the latest payroll entry for the employee
            payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)
        
            if payroll:
                calculate_salary(payroll)
                # Generate salary slip
                salary_slip = generate_salary_slip(payroll)

                # Include all relevant data in the response
                employee_data = {
                    'employee_id': employee.id,
                    'name': employee.name,
                    'payroll_data': salary_slip
                }

                return jsonify({'employee_data': employee_data})
            else:
                return jsonify({'error': 'Payroll entry not found'})
        else:
            return jsonify({'error': 'Employee not found'})
    else:
        return jsonify({'error': 'Method not allowed'})
    


# Endpoint for updating payroll with CORS handling
@app.route('/admin/update_payroll/<employee_id>', methods=['OPTIONS', 'POST'])
@cross_origin(supports_credentials=True)
# ... (previous code)

def admin_update_payroll(employee_id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight request received'}), 200

    if request.method == 'POST':
        # Get the payroll data from the request
        payroll_data = request.get_json()

        # Retrieve the employee
        employee = Employee.query.get(employee_id)

        if employee:
            # Retrieve the latest payroll entry for the employee
            payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)

            if payroll:
                # Update the payroll based on the received data
                payroll.base_salary = payroll_data.get('base_salary', payroll.base_salary)
                payroll.deductions = payroll_data.get('deductions', payroll.deductions)
                payroll.bonuses = payroll_data.get('bonuses', payroll.bonuses)
                payroll.tax_percentage = payroll_data.get('tax_percentage', payroll.tax_percentage)

                # Commit changes to the database
                db.session.commit()

                # Generate and return updated salary slip
                updated_salary_slip = generate_salary_slip(payroll)  # Assuming this function updates the slip in place

                # Convert the payroll object to a dictionary
                payroll_dict = {
                    'base_salary': payroll.base_salary,
                    'deductions': payroll.deductions,
                    'bonuses': payroll.bonuses,
                    'tax_percentage': payroll.tax_percentage,
                    # Add other attributes as needed
                }

                return jsonify({'message': f'Payroll updated successfully for employee {employee_id}',
                                'updated_salary_slip': updated_salary_slip,
                                'payroll': payroll_dict})
            else:
                return jsonify({'error': 'Payroll entry not found'})
        else:
            return jsonify({'error': 'Employee not found'})
    else:
        return jsonify({'error': 'Method not allowed'}), 405



# Endpoint for the admin to get tax-related information, deductions, and bonuses for a specific employee
@app.route('/admin/get_tax_deductions_bonuses/<employee_id>', methods=['GET'])
def admin_get_tax_deductions_bonuses(employee_id):
    payroll = Payroll.query.filter_by(employee_id=employee_id, month=datetime.now().month, year=datetime.now().year).first()
    if payroll:
        calculate_salary(payroll)
        tax_info = {
            'tax_percentage': payroll.tax_percentage,
            'deductions_percentage': payroll.deductions_percentage,
            'bonuses_percentage': payroll.bonuses_percentage,
            'tax_amount': payroll.tax,
            'deductions_amount': payroll.deductions,
            'bonuses_amount': payroll.bonuses
        }
        return jsonify({'tax_deductions_bonuses': tax_info})
    else:
        return jsonify({'error': 'Payroll entry not found'})


@app.route('/admin/monitor_all_attendance', methods=['GET'])
def admin_monitor_all_attendance():
    employees = Employee.query.all()
    all_attendance = []

    for employee in employees:
        # Retrieve attendance data for each employee from the database
        attendance_records = Attendance.query.filter_by(employee_id=employee.id).all()

        # Format the attendance records
        formatted_attendance = [{
            'clock_in_time': record.clock_in_time.strftime("%Y-%m-%d %H:%M:%S"),
            'clock_out_time': record.clock_out_time.strftime("%Y-%m-%d %H:%M:%S")
        } for record in attendance_records]

        all_attendance.append({'employee_id': employee.id, 'attendance': formatted_attendance})

    return jsonify({'all_attendance': all_attendance})

# Endpoint for the admin to monitor attendance for a specific employee
@app.route('/admin/monitor_attendance/<employee_id>', methods=['GET'])
def admin_monitor_attendance(employee_id):
    try:
        # Retrieve all attendance records for a specific employee from the database
        attendance_records = Attendance.query.filter_by(employee_id=employee_id).all()

        # Check if there are any attendance records
        if not attendance_records:
            return jsonify({'employee_id': employee_id, 'attendance': []})

        # Format all attendance records
        formatted_attendance = [{
            'clock_in_time': record.clock_in_time.strftime("%Y-%m-%d %H:%M:%S") if record.clock_in_time else None,
            'clock_out_time': record.clock_out_time.strftime("%Y-%m-%d %H:%M:%S") if record.clock_out_time else None
        } for record in attendance_records]

        return jsonify({'employee_id': employee_id, 'attendance': formatted_attendance})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Employee routes

# Endpoint for the employee to get their salary slip
@app.route('/employee/get_salary_slip/<employee_id>', methods=['GET'])
def employee_get_salary_slip(employee_id):
    payroll = Payroll.query.filter_by(employee_id=employee_id, month=datetime.now().month, year=datetime.now().year).first()
    if payroll:
        calculate_salary(payroll)
        salary_slip = generate_salary_slip(payroll)
        return jsonify({'salary_slip': salary_slip})
    else:
        return jsonify({'error': 'Payroll entry not found'})

# Endpoint for the employee to get tax-related information, deductions, and bonuses
@app.route('/employee/get_tax_deductions_bonuses/<employee_id>', methods=['GET'])
def employee_get_tax_deductions_bonuses(employee_id):
    payroll = Payroll.query.filter_by(employee_id=employee_id, month=datetime.now().month, year=datetime.now().year).first()
    if payroll:
        calculate_salary(payroll)
        tax_info = {
            'tax_percentage': payroll.tax_percentage,
            'deductions_percentage': payroll.deductions_percentage,
            'bonuses_percentage': payroll.bonuses_percentage,
            'tax_amount': payroll.tax,
            'deductions_amount': payroll.deductions,
            'bonuses_amount': payroll.bonuses
        }
        return jsonify({'tax_deductions_bonuses': tax_info})
    else:
        return jsonify({'error': 'Payroll entry not found'})

# Endpoint for the employee to post their attendance
@app.route('/employee/attendance/<employee_id>', methods=['OPTIONS', 'POST'])
@cross_origin(supports_credentials=True)
def employee_post_attendance(employee_id):
    if request.method == 'OPTIONS':
        # Respond to preflight request
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()

    # Check if 'clock_in_time' or 'clock_out_time' is present in the data
    if 'clock_in_time' in data:
        clock_in_time = data['clock_in_time']
        clock_out_time = None
    elif 'clock_out_time' in data:
        clock_in_time = None
        clock_out_time = data['clock_out_time']
    else:
        return jsonify({'error': 'Invalid request. Missing clock_in_time or clock_out_time.'}), 400

    try:
        if clock_in_time:
            clock_in_time = datetime.strptime(clock_in_time, "%Y-%m-%d %H:%M:%S")
        if clock_out_time:
            clock_out_time = datetime.strptime(clock_out_time, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({'error': 'Invalid datetime format. Use "%Y-%m-%d %H:%M:%S".'}), 400

    # Save attendance data to the database
    attendance = Attendance(employee_id=employee_id, clock_in_time=clock_in_time, clock_out_time=clock_out_time)
    db.session.add(attendance)
    db.session.commit()

    return jsonify({'message': 'Attendance posted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
