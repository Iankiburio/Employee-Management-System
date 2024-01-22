from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from models import db, Admin, Employee, Payroll, User
from flask_cors import CORS
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ems.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)


class AdminListResource(Resource):
    def get(self):
        admins = Admin.query.all()
        admin_list = [admin.to_dict() for admin in admins]
        return make_response(jsonify({'admins': admin_list}), 200)

    def post(self):
        data = request.get_json()
        try:
            admin = Admin(**data)
            db.session.add(admin)
            db.session.commit()
            return make_response(jsonify({'message': 'Admin created successfully'}), 201)
        except ValueError as e:
            return make_response(jsonify({'error': str(e)}), 400)


class AdminResource(Resource):
    def get(self, admin_id):
        admin = Admin.query.get(admin_id)
        if admin:
            return make_response(jsonify(admin.to_dict()), 200)
        return make_response(jsonify({'error': 'Admin not found'}), 404)

    def delete(self, admin_id):
        admin = Admin.query.get(admin_id)
        if admin:
            db.session.delete(admin)
            db.session.commit()
            return make_response(jsonify({'message': 'Admin deleted successfully'}), 200)
        return make_response(jsonify({'error': 'Admin not found'}), 404)

    def patch(self, admin_id):
        admin = Admin.query.get(admin_id)
        if admin:
            data = request.get_json()
            try:
                # Update the admin attributes based on the data
                for key, value in data.items():
                    setattr(admin, key, value)
                db.session.commit()
                return make_response(jsonify({'message': 'Admin updated successfully'}), 200)
            except ValueError as e:
                return make_response(jsonify({'error': str(e)}), 400)
        return make_response(jsonify({'error': 'Admin not found'}), 404)


class EmployeeListResource(Resource):
    def get(self):
        employees = Employee.query.all()
        employee_list = [employee.to_dict() for employee in employees]
        return make_response(jsonify({'employees': employee_list}), 200)

    def post(self):
        data = request.get_json()
        try:
            employee = Employee(**data)
            db.session.add(employee)
            db.session.commit()
            return make_response(jsonify({'message': 'Employee created successfully'}), 201)
        except ValueError as e:
            return make_response(jsonify({'error': str(e)}), 400)


class EmployeeResource(Resource):
    def get(self, employee_id):
        employee = Employee.query.get(employee_id)
        if employee:
            return make_response(jsonify(employee.to_dict()), 200)
        return make_response(jsonify({'error': 'Employee not found'}), 404)

    def delete(self, employee_id):
        employee = Employee.query.get(employee_id)
        if employee:
            db.session.delete(employee)
            db.session.commit()
            return make_response(jsonify({'message': 'Employee deleted successfully'}), 200)
        return make_response(jsonify({'error': 'Employee not found'}), 404)

    def patch(self, employee_id):
        employee = Employee.query.get(employee_id)
        if employee:
            data = request.get_json()
            try:
                # Update the employee attributes based on the data
                for key, value in data.items():
                    setattr(employee, key, value)
                db.session.commit()
                return make_response(jsonify({'message': 'Employee updated successfully'}), 200)
            except ValueError as e:
                return make_response(jsonify({'error': str(e)}), 400)
        return make_response(jsonify({'error': 'Employee not found'}), 404)


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        return make_response(jsonify({'error': 'User not found'}), 404)

    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            try:
                # Update the user attributes based on the data
                for key, value in data.items():
                    setattr(user, key, value)
                db.session.commit()
                return make_response(jsonify({'message': 'User updated successfully'}), 200)
            except ValueError as e:
                return make_response(jsonify({'error': str(e)}), 400)
        return make_response(jsonify({'error': 'User not found'}), 404)


api.add_resource(AdminListResource, '/admins')
api.add_resource(AdminResource, '/admins/<int:admin_id>')
api.add_resource(EmployeeListResource, '/employees')
api.add_resource(EmployeeResource, '/employees/<int:employee_id>')
api.add_resource(UserResource, '/users/<int:user_id>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)