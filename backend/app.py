from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from models import db,Employee_Leaverequest, Leavetype, Admin, Employee, User , Payroll
from flask_cors import CORS , cross_origin
from flask_restful import Api
import calendar
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.ocehkzakvorfyqxagyno:sPA3ob0kZELARFQS@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)



api = Api(app)

@app.route('/adminsignup', methods=['POST'])
def adminsignup():

    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    password = request.json['password']
    username = request.json['username']

    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    if 'username' not in request.json or 'last_name' not in request.json or 'first_name' not in request.json or'email' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)
    if username == '' or last_name =='' or first_name == '' or email == '' or password == '':
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    if Admin.query.filter_by(username=username).first() and Admin.query.filter_by(first_name=first_name).first() and Admin.query.filter_by(last_name=last_name).first():
        return make_response(jsonify({"msg": "User already exists"}), 400)

    admin = Admin(username=username,email=email,password=password,first_name=first_name,last_name=last_name)
    db.session.add(admin)
    db.session.commit()
    
    return make_response(jsonify({"msg": "User created successfully"}), 201)


@app.route('/adminlogin', methods=['POST'])
def adminlogin():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    if 'first_name' not in request.json or 'last_name' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    first_name = request.json['first_name']
    last_name = request.json['last_name']
    password = request.json['password']

    if last_name is None or first_name is None or  password is None:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    admin = Admin.query.filter_by(first_name=first_name, last_name=last_name ,password=password).first()

    if not admin:
        return make_response(jsonify({"msg": "Invalid username or password"}), 401)

    return make_response(jsonify({"msg": "Login successful","role":"Admin","id":admin.id}), 200)

@app.route('/employeesignup', methods=['POST'])
def employeesignup():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    if  'last_name' not in request.json or'first_name' not in request.json or 'email' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    department = request.json['department']
    role = request.json['role']
    bank_account = request.json['bank_account']
    gender = request.json['gender']
    joining_date = request.json['joining_date']
    birth_date = request.json['birth_date']
    contact = request.json['contact']

    if first_name is None or last_name is None or email is None or password is None:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    if Admin.query.filter_by(email=email).first():
        return make_response(jsonify({"msg": "User already exists"}), 400)

    employee = Employee(
                  email=email, 
                  password=password,
                  first_name=first_name,
                  last_name=last_name,
                  contact=contact,
                  department=department,
                  role=role,
                  bank_account=bank_account,
                  gender=gender,
                  joining_date=joining_date,
                  birth_date=birth_date
                  )
    db.session.add(employee)
    db.session.commit()

    return make_response(jsonify({"msg": "User created successfully"}), 201)


@app.route('/employeelogin', methods=['POST'])
def employeelogin():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    if 'first_name' not in request.json or 'last_name' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    first_name = request.json['first_name']
    last_name = request.json['last_name']
    password = request.json['password']

    if last_name is None or first_name is None or  password is None:
        return make_response(jsonify({"msg": "Missing JSON data in request"}), 400)

    employee = Employee.query.filter_by(first_name=first_name, last_name=last_name, password=password).first()

    if not employee:
        return make_response(jsonify({"msg": "Invalid username or password"}), 401)

    return make_response(jsonify({"msg": "Login successful","role":"Employee","id":employee.id}), 200)

# Admin routes
@app.route('/admins', methods=['GET'])
def get_admins():
    admins = Admin.query.all()
    admin_list = [admin.to_dict() for admin in admins]
    return make_response(jsonify({'admins': admin_list}), 200)

@app.route('/admins', methods=['POST'])
def create_admin():
    data = request.get_json()
    try:
        admin = Admin(**data)
        db.session.add(admin)
        db.session.commit()
        return make_response(jsonify({'message': 'Admin created successfully'}), 201)
    except ValueError as e:
        return make_response(jsonify({'error': str(e)}), 400)

@app.route('/admins/<int:admin_id>', methods=['GET'])
def get_admin(admin_id):
    admin = Admin.query.get(admin_id)
    if admin:
        return make_response(jsonify(admin.to_dict()), 200)
    return make_response(jsonify({'error': 'Admin not found'}), 404)

@app.route('/admins/<int:admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    admin = Admin.query.get(admin_id)
    if admin:
        db.session.delete(admin)
        db.session.commit()
        return make_response(jsonify({'message': 'Admin deleted successfully'}), 200)
    return make_response(jsonify({'error': 'Admin not found'}), 404)

@app.route('/admins/<int:admin_id>', methods=['PATCH'])
def update_admin(admin_id):
    admin = Admin.query.get(admin_id)
    if admin:
        data = request.get_json()
        try:
            for key, value in data.items():
                setattr(admin, key, value)
            db.session.commit()
            return make_response(jsonify({'message': 'Admin updated successfully'}), 200)
        except ValueError as e:
            return make_response(jsonify({'error': str(e)}), 400)
    return make_response(jsonify({'error': 'Admin not found'}), 404)


# Employee routes
@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    employee_list = [employee.to_dict() for employee in employees]
    return make_response(jsonify({'employees': employee_list}), 200)

@app.route('/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    try:
        #data['joining_date'] = datetime.datetime.strptime(data['joining_date'], "%Y-%m-%d").date()
        #data['birth_date'] = datetime.datetime.strptime(data['birth_date'], "%Y-%m-%d").date()
        employee = Employee(**data)
        db.session.add(employee)
        db.session.commit()
        return make_response(jsonify({'message': 'Employee created successfully'}), 201)
    except ValueError as e:
        return make_response(jsonify({'error': str(e)}), 400)

@app.route('/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        return make_response(jsonify(employee.to_dict()), 200)
    return make_response(jsonify({'error': 'Employee not found'}), 404)

@app.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        db.session.delete(employee)
        db.session.commit()
        return make_response(jsonify({'message': 'Employee deleted successfully'}), 200)
    return make_response(jsonify({'error': 'Employee not found'}), 404)

@app.route('/employees/<int:employee_id>', methods=['PATCH'])
def update_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        data = request.get_json()
        try:
            for key, value in data.items():
                setattr(employee, key, value)
            db.session.commit()
            return make_response(jsonify({'message': 'Employee updated successfully'}), 200)
        except ValueError as e:
            return make_response(jsonify({'error': str(e)}), 400)
    return make_response(jsonify({'error': 'Employee not found'}), 404)


# User routes

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        #data['joining_date'] = datetime.datetime.strptime(data['joining_date'], "%Y-%m-%d").date()
        #data['birth_date'] = datetime.datetime.strptime(data['birth_date'], "%Y-%m-%d").date()
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return make_response(jsonify({'message': 'User created successfully'}), 201)
    except ValueError as e:
        return make_response(jsonify({'error': str(e)}), 400)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return make_response(jsonify(user.to_dict()), 200)
    return make_response(jsonify({'error': 'User not found'}), 404)

@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user:
        data = request.get_json()
        try:
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
            return make_response(jsonify({'message': 'User updated successfully'}), 200)
        except ValueError as e:
            return make_response(jsonify({'error': str(e)}), 400)
    return make_response(jsonify({'error': 'User not found'}), 404)


# Route to get all leave requests
@app.route('/leave-requests', methods=['GET'])
def get_leave_requests():
    all_data = []
    leave_requests = db.session.query(Employee_Leaverequest, Employee, Leavetype).join(Employee).join(Leavetype).all()
    for leave_request, employee, leave_type in leave_requests:
        employee_data = {
            'id': employee.id,
            'first_name': employee.first_name,
            'last_name': employee.last_name,
            'email': employee.email,
            'department': employee.department,
            'role': employee.role,
            'bank_account': employee.bank_account,
            'gender': employee.gender,
            'joining_date': leave_request.start_date.strftime('%Y-%m-%d'),
            'birth_date': employee.birth_date,
            'contact': employee.contact
        }
        
        leave_type_data = {
            'id': leave_type.id,
            'leave_description': leave_type.leave_description,
            'leave_days': leave_type.leave_days,
            'gender': leave_type.gender,
            'leave_balances': leave_type.leave_balances
        }
        
        leave_request_data = {
            'id': leave_request.id,
            'employee': employee_data,
            'leave_type': leave_type_data,
            'start_date': leave_request.start_date.strftime('%Y-%m-%d'),
            'end_date': leave_request.end_date.strftime('%Y-%m-%d'),
            'status': leave_request.status,
            'admin_comment': leave_request.admin_comment,
            'action': leave_request.action,
            'return_date': leave_request.Return_date.strftime('%Y-%m-%d'),
            'leave_balances': leave_request.leave_balances
        }
        all_data.append(leave_request_data)
    return jsonify(all_data)

# Route to create a new leave request
@app.route('/leave-requests', methods=['POST'])
def create_leave_request():
    print("Leave request not foun")
    data = request.get_json()
    
    #return jsonify(data)
    #print(request.get_json())
    new_request = Employee_Leaverequest(
        leavetype_ID=data['leavetype_ID'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        status=data['status'],
        admin_comment=data['admin_comment'],
        action=data['action'],
        Return_date=data['Return_date'],
        leave_balances=data['leave_balances'],
        employee_ID=data['employee_ID']
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Leave request created successfully'})


@app.route("/leave-request/update",methods=["PUT"])
def update_leave_request():
   # Extract id, status, and admin_comment from the request body
    data = request.json
    request_id = data.get('id')
    status = data.get('status')
    admin_comment = data.get('admin_comment')

    # Ensure the id is provided in the request body
    if request_id is None:
        return jsonify({'error': 'ID is required in the request body'}), 400

    # Retrieve the leave request object from the database
    leave_request = Employee_Leaverequest.query.get_or_404(request_id)

    # Update the leave request object
    if status is not None:
        leave_request.status = status
    if admin_comment is not None:
        leave_request.admin_comment = admin_comment

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Leave request updated successfully'}), 200
# Route to get all leave types
@app.route('/leave-types', methods=['GET'])
def get_leave_types():
    leave_types = Leavetype.query.all()
    leave_types_data = []
    for leave_type in leave_types:
        leave_types_data.append({
            'id': leave_type.id,
            'leave_description': leave_type.leave_description,
            'leave_days': leave_type.leave_days,
            'gender': leave_type.gender,
            'leave_balances': leave_type.leave_balances
        })
    return jsonify({'leave_types': leave_types_data})


# Admin dashboard endpoint to get a list of all employees
@app.route('/admin/get_all_employees', methods=['GET'])
def admin_get_all_employees():
    employees = Employee.query.all()
    employee_names = [{'employee_id': employee.id, 'employee_name': f'{employee.first_name} {employee.last_name}'} for employee in employees]

    return jsonify({'employee_names': employee_names})



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

    # Debugging: Print the values before calculation
    print(f"Before Calculation - Base Salary: {base_salary}, Deductions: {deductions_percentage}, Bonuses: {bonuses_percentage}, Tax: {tax_percentage}")

    deductions, bonuses, tax, gross_pay, net_salary = calculate_salary_components(
        base_salary, deductions_percentage, bonuses_percentage, tax_percentage
    )

    # Debugging: Print the calculated values
    print(f"Calculated - Deductions: {deductions}, Bonuses: {bonuses}, Tax: {tax}, Gross Pay: {gross_pay}, Net Salary: {net_salary}")

    # Update payroll entry
    payroll.deductions = deductions
    payroll.bonuses = bonuses
    payroll.tax = tax
    payroll.gross_pay = gross_pay
    payroll.net_salary = net_salary

    # Debugging: Print the updated values
    print(f"After Update - Deductions: {payroll.deductions}, Bonuses: {payroll.bonuses}, Tax: {payroll.tax}, Gross Pay: {payroll.gross_pay}, Net Salary: {payroll.net_salary}")

# Function to generate salary slip for a payroll entry
def generate_salary_slip(payroll):
    # Use correct attribute for employee name
    employee_name = f'{payroll.employee.first_name} {payroll.employee.last_name}' if payroll.employee else 'Unknown Employee'

    # Get the month name using the calendar module
    month_name = calendar.month_name[payroll.month]

    # Get the current date and time
    generation_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    return {
        'employee_id': payroll.employee.id if payroll.employee else None,
        'name': employee_name,
        'payroll_data': {
            'base_salary': payroll.base_salary,
            'deductions_percentage': payroll.deductions_percentage,
            'bonuses_percentage': payroll.bonuses_percentage,
            'tax_percentage': payroll.tax_percentage,
            'deductions': payroll.deductions,
            'bonuses': payroll.bonuses,
            'tax': payroll.tax,
            'gross_pay': payroll.gross_pay,
            'net_salary': payroll.net_salary,
            'generation_date': generation_date,
        }
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

# Endpoint for the admin to process monthly payroll for a specific employee
@app.route('/admin/process_monthly_payroll/<employee_id>', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def admin_process_monthly_payroll_employee(employee_id):
    if request.method == 'POST':
        # Process payroll for a specific employee
        employee = Employee.query.get(employee_id)
        
        if employee:
            # Retrieve or create the latest payroll entry for the employee
            payroll = get_or_create_payroll_entry(employee)

            calculate_salary(payroll)
            db.session.commit()

            # Generate salary slip
            salary_slip = generate_salary_slip(payroll)

            return jsonify({'message': f'Monthly payroll processed successfully for employee {employee_id}',
                            'salary_slip': salary_slip})
        else:
            return jsonify({'error': 'Employee not found'})

    elif request.method == 'GET':
        # Retrieve all data for a specific employee
        employee = Employee.query.get(employee_id)

        if employee:
            # Retrieve or create the latest payroll entry for the employee
            payroll = get_or_create_payroll_entry(employee)

            calculate_salary(payroll)
            # Generate salary slip
            salary_slip = generate_salary_slip(payroll)

            # Include all relevant data in the response
            employee_data = {
                'employee_id': employee.id,
                'name': f'{employee.first_name} {employee.last_name}',
                'payroll_data': salary_slip
            }

            return jsonify({'employee_data': employee_data})
        else:
            return jsonify({'error': 'Employee not found'})
    else:
        return jsonify({'error': 'Method not allowed'})

# Function to get or create the latest payroll entry for an employee
def get_or_create_payroll_entry(employee):
    # Try to retrieve the latest payroll entry for the current month and year
    payroll = next((p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year), None)

    if not payroll:
        # If payroll entry does not exist, create a new one
        payroll = create_payroll_entry(employee)

    return payroll

# Function to create a new payroll entry for the current month and year
def create_payroll_entry(employee):
    # Create a new payroll entry for the current month and year
    new_payroll = Payroll(month=datetime.now().month, year=datetime.now().year)
    employee.payrolls.append(new_payroll)
    db.session.add(new_payroll)
    db.session.commit()
    return new_payroll


@app.route('/admin/update_payroll/<employee_id>', methods=['OPTIONS', 'POST'])
@cross_origin(supports_credentials=True, methods=['OPTIONS', 'POST'], headers=['Content-Type'])
def admin_update_payroll(employee_id):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight request received'}), 200

    if request.method == 'POST':
        # Get the payroll data from the request
        payroll_data = request.json  # Use request.json directly

        # Retrieve the employee
        employee = Employee.query.get(employee_id)

        if employee:
            # Retrieve the latest payroll entry for the employee
            payroll = next(
                (p for p in employee.payrolls if p.month == datetime.now().month and p.year == datetime.now().year),
                None)

            if payroll:
                # Update the existing payroll based on the received data
                payroll.base_salary = payroll_data.get('base_salary', payroll.base_salary)
                payroll.deductions = payroll_data.get('deductions', payroll.deductions)
                payroll.bonuses = payroll_data.get('bonuses', payroll.bonuses)

                # Update tax_percentage if provided in the request
                new_tax_percentage = payroll_data.get('tax_percentage', payroll.tax_percentage)
                payroll.tax_percentage = new_tax_percentage

                # Calculate salary components
                calculate_salary(payroll)
            else:
                # Create a new payroll entry if not found
                payroll = Payroll(
                    base_salary=payroll_data.get('base_salary', 0),
                    deductions=payroll_data.get('deductions', 0),
                    bonuses=payroll_data.get('bonuses', 0),
                    tax_percentage=payroll_data.get('tax_percentage', 0.15),
                    month=datetime.now().month,
                    year=datetime.now().year
                )
                employee.payrolls.append(payroll)
                db.session.add(payroll)

            # Commit changes to the database
            db.session.commit()

            # Generate and return updated salary slip
            updated_salary_slip = generate_salary_slip(payroll)

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
            return jsonify({'error': 'Employee not found'})
    else:
        return jsonify({'error': 'Method not allowed'}), 405



# Endpoint for the employee to get their salary slip
@app.route('/employee/get_salary_slip/<employee_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def employee_get_salary_slip(employee_id):
    payroll = Payroll.query.filter_by(employee_id=employee_id).order_by(Payroll.year.desc(), Payroll.month.desc()).first()

    if payroll:
        calculate_salary(payroll)
        salary_slip = generate_salary_slip(payroll)
        return jsonify({'salary_slip': salary_slip})
    else:
        return jsonify({'error': 'Payroll entry not found'})

# Endpoint for the employee to get tax-related information, deductions, and bonuses
@app.route('/employee/get_tax_deductions_bonuses/<employee_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def employee_get_tax_deductions_bonuses(employee_id):
    payroll = Payroll.query.filter_by(employee_id=employee_id).order_by(Payroll.year.desc(), Payroll.month.desc()).first()

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


if __name__ == '__main__':
    app.run(debug=True)

