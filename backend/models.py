from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Admin(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    username = db.Column(db.String(200),nullable=False)
    first_name = db.Column(db.String(200),nullable=False)
    last_name = db.Column(db.String(200),nullable=False)
    email = db.Column(db.String(200),nullable=False)
    password = db.Colun(db.String(200),nullable=False)

class Employee(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    first_name = db.Column(db.String(200),nullable=False)
    last_name = db.Column(db.String(200),nullable=False)
    email = db.Column(db.String(200),nullable=False)
    password = db.Colun(db.String(200),nullable=False)
    department = db.Column(db.String(200),nullable=False)
    role = db.Column(db.String(200),nullable=False)
    bank_account = db.Column(db.Interger,nullable=False)
    gender = db.Column(db.String(200),nullable=False)
    joining_date = db.Column(db.Date,nullable=False)
    contact = db.Column(db.Interger,nullable=False)

class User(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    user = db.Column(db.String(200),nullable=False)
    password = db.Column(db.String(200),nullable=False)

class Payroll(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    employee_ID = db.Column(db.Interger,db.ForeignKey('employee.id'),nullable=True)
    month = db.Column(db.Interger,nullable=False)
    year = db.Column(db.Interger,nullable=False)
    gross = db.Column(db.Float,nullable=False)
    allowances = db.Column(db.Float,nullable=True)
    deductions = db.Column(db.Float,nullable=True)
    bonuses = db.Column(db.Float,nullable=True)
    taxes = db.Column(db.Float,nullable=True)
    net = db.Column(db.Float,nullable=False)

