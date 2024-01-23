from flask import Flask, jsonify, request, make_response, request
from flask_migrate import Migrate
from models import db, Admin, Employee, User
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ems.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)


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
        data['joining_date'] = datetime.strptime(data['joining_date'], "%Y-%m-%d").date()
        data['birth_date'] = datetime.strptime(data['birth_date'], "%Y-%m-%d").date()
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

if __name__ == '__main__':
    app.run(debug=True)