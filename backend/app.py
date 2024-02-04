from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from models import db,Employee_Leaverequest, Leavetype, Admin, Employee, User
from flask_cors import CORS
from flask_restful import Api

import datetime


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

    return make_response(jsonify({"msg": "Login successful"}), 200)

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

    return make_response(jsonify({"msg": "Login successful"}), 200)

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
    leave_requests = Employee_Leaverequest.query.all()
    leave_requests_data = []
    for request in leave_requests:
        leave_requests_data.append({
            'id': request.id,
            'leavetype_ID': request.leavetype_ID,
            'start_date': str(request.start_date),
            'end_date': str(request.end_date),
            'status': request.status,
            'admin_comment': request.admin_comment,
            'action': request.action,
            'Return_date': str(request.Return_date),
            'leave_balances': request.leave_balances,
            'employee_ID': request.employee_ID
        })
    return jsonify({'leave_requests': leave_requests_data})


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


if __name__ == '__main__':
    app.run(debug=True)

