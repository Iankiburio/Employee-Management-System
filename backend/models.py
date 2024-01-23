from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    base_salary = db.Column(db.Float, default=0)  # New attribute for the base salary
    deductions_percentage = db.Column(db.Float, default=0.1)  # 10% deductions
    bonuses_percentage = db.Column(db.Float, default=0.05)    # 5% bonuses
    tax_percentage = db.Column(db.Float, default=0.15)        # 15% taxes
    deductions = db.Column(db.Float, default=0)
    bonuses = db.Column(db.Float, default=0)
    tax = db.Column(db.Float, default=0)
    net_salary = db.Column(db.Float, default=0)

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    clock_in_time = db.Column(db.DateTime)
    clock_out_time = db.Column(db.DateTime)
