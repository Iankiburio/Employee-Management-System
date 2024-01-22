from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SubmitField, DateField
from wtforms.validators import DataRequired
from datetime import datetime
from wtforms.widgets import Input

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Employee Model
class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255))
    contact_info = db.Column(db.String(255))
    basic_salary = db.Column(db.Float, nullable=False)
    deductions = db.Column(db.Float, default=0.0)
    bonuses = db.Column(db.Float, default=0.0)
    leave_balance = db.Column(db.Integer, default=0)
    attendances = db.relationship('Attendance', backref='employee', lazy=True)
    leave_requests = db.relationship('LeaveRequest', backref='employee', lazy=True)

# Leave Request Model
class LeaveRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), default='Pending')
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)

# Attendance Model
class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clock_in = db.Column(db.DateTime, nullable=False)
    clock_out = db.Column(db.DateTime)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)

# Forms
class DatePickerWidget(Input):
    input_type = 'date'

class LeaveRequestForm(FlaskForm):
    start_date = DateField('Start Date', validators=[DataRequired()], widget=DatePickerWidget())
    end_date = DateField('End Date', validators=[DataRequired()], widget=DatePickerWidget())
    submit = SubmitField('Submit Leave Request')

# Routes

# Admin Dashboard
@app.route('/admin')
def admin_dashboard():
    employees = Employee.query.all()
    return render_template('admin_dashboard.html', employees=employees)

# Admin Employee Details
@app.route('/admin/employee_details/<int:employee_id>')
def admin_employee_details(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    return render_template('admin_employee_details.html', employee=employee)

# Leave Management for Admin
@app.route('/admin/leave_management/<int:employee_id>', methods=['GET', 'POST'])
def admin_leave_management(employee_id):
    if request.method == 'POST':
        leave_request_id = request.form.get('leave_request_id')
        action = request.form.get('action')

        if action == 'approve':
            leave_request = LeaveRequest.query.get_or_404(leave_request_id)
            leave_request.status = 'Approved'
            db.session.commit()

        elif action == 'reject':
            leave_request = LeaveRequest.query.get_or_404(leave_request_id)
            leave_request.status = 'Rejected'
            db.session.commit()

    employee = Employee.query.get_or_404(employee_id)
    leave_requests = LeaveRequest.query.filter_by(employee_id=employee_id).all()

    return render_template('admin_leave_management.html', employee=employee, leave_requests=leave_requests)

# Process Monthly Payroll for Admin
@app.route('/admin/process_payroll', methods=['GET', 'POST'])
def admin_process_payroll():
    if request.method == 'POST':
        for employee in Employee.query.all():
            total_salary = employee.basic_salary - employee.deductions + employee.bonuses
            employee.leave_balance += 2
            db.session.commit()

        return redirect(url_for('admin_dashboard'))

    employees = Employee.query.all()
    return render_template('admin_process_payroll.html', employees=employees)

# Attendance Tracking for Admin
@app.route('/admin/attendance_tracking/<int:employee_id>')
def admin_attendance_tracking(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    attendances = Attendance.query.filter_by(employee_id=employee_id).all()

    return render_template('admin_attendance_tracking.html', employee=employee, attendances=attendances)

# Employee Dashboard
@app.route('/employee_dashboard/<int:employee_id>', methods=['GET', 'POST'])
def employee_dashboard(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    form = LeaveRequestForm()  # Create an instance of the form

    if request.method == 'POST' and form.validate_on_submit():
        # Process form submission if needed
        pass

    return render_template('employee_dashboard.html', employee=employee, form=form)

# Leave Request Management for Employees
from datetime import datetime

# ...

@app.route('/employee_leave_request/<int:employee_id>', methods=['POST'])
def employee_leave_request(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    form = LeaveRequestForm()

    if form.validate_on_submit():
        start_date_str = form.start_date.data
        end_date_str = form.end_date.data

        # Convert date strings to Python date objects
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

        # Create LeaveRequest object
        leave_request = LeaveRequest(
            start_date=start_date,
            end_date=end_date,
            employee_id=employee_id
        )

        # Add and commit to the database
        db.session.add(leave_request)
        db.session.commit()

        return redirect(url_for('employee_dashboard', employee_id=employee_id))

    return render_template('employee_dashboard.html', form=form, employee=employee)

# View Leave Request Status and History for Employees
@app.route('/employee/leave_status_history/<int:employee_id>')
def employee_leave_status_history(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    leave_requests = LeaveRequest.query.filter_by(employee_id=employee_id).all()

    return render_template('employee_leave_status_history.html', employee=employee, leave_requests=leave_requests)

# Access to Salary Information for Employees
@app.route('/employee/salary_info/<int:employee_id>')
def employee_salary_info(employee_id):
    employee = Employee.query.get_or_404(employee_id)
    # Fetch salary-related information for the employee
    # ...

    return render_template('employee_salary_info.html', employee=employee)

def seed_database():
    if Employee.query.count() == 0:
        employee1 = Employee(
            name='Brian Chege',
            position='Software Engineer',
            department='IT',
            contact_info='brianchege@gmail.com',
            basic_salary=60000.0,
            deductions=2000.0,
            bonuses=5000.0,
            leave_balance=20
        )
        db.session.add(employee1)

        employee2 = Employee(
            name='Ian Kiburio',
            position='Marketing Manager',
            department='Marketing',
            contact_info='adenian@gmail.com',
            basic_salary=70000.0,
            deductions=2500.0,
            bonuses=6000.0,
            leave_balance=18
        )
        db.session.add(employee2)

        db.session.commit()

if __name__ == '__main__':
    db.create_all()
    seed_database()
    app.run(debug=True)
