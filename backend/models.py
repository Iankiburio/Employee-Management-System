from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    payroll = db.relationship('Payroll', back_populates='employee', uselist=False)
    attendances = db.relationship('Attendance', back_populates='employee', lazy=True)

class Payroll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    employee = db.relationship('Employee', back_populates='payroll')
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    base_salary = db.Column(db.Float, default=0)
    deductions_percentage = db.Column(db.Float, default=0.1)
    bonuses_percentage = db.Column(db.Float, default=0.05)
    tax_percentage = db.Column(db.Float, default=0.15)
    deductions = db.Column(db.Float, default=0)
    bonuses = db.Column(db.Float, default=0)
    tax = db.Column(db.Float, default=0)
    gross_pay = db.Column(db.Float, default=0)
    net_salary = db.Column(db.Float, default=0)

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    employee = db.relationship('Employee', back_populates='attendances', lazy=True)
    clock_in_time = db.Column(db.DateTime)
    clock_out_time = db.Column(db.DateTime, default=None)
