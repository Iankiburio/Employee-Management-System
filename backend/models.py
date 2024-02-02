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
    birth_date = db.Column(db.Date,nullable=False)
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

class Leavetype(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    leave_description = db.Column(db.String,nullable=False)
    leave_days = db.Column(db.Interger,nullable=False)
    gender = db.Column(db.String,nullable=False)
    leave_balances = db.Column(db.Float,nullable=False)

class Holidaycalendar(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    holiday_date = db.Column(db.Date,nullable=False)
    holiday_name = db.Column(db.String,nullable=False)
    company_eventID = db.Column(db.Interger,primary_key=True)
    company_event_title = db.Column(db.String,nullable=False)
    company_event_start = db.Column(db.Date, default=None)
    company_event_end = db.Column(db.Date, default=None)



class Attendance(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    employee_ID = db.Column(db.Interger,db.ForeignKey('employee.id'),nullable=True)
    clock_in = db.Column(db.DateTime)
    clock_out = db.Column(db.DateTime)
    date = db.Column(db.Date,nullable=False)

class Notification(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    admin_ID = db.Column(db.Interger,db.ForeignKey('admin.id'),nullable=True)
    employee_name = db.Column(db.String(200),nullable=False)
    employee_name = db.Column(db.String(200),nullable=False)
    employee_ID = db.Column(db.Interger,db.ForeignKey('employee.id'),nullable=True)
    timestamp = db.Column(db.DateTime, default=None)
    action = db.Column(db.String,nullable=False)

class Employee_Leaverequest(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    leavetype_ID = db.Column(db.Interger,db.ForeignKey('leavetype.id'),nullable=True)
    start_date = db.Column(db.Date,nullable=False)
    end_date = db.Column(db.Date,nullable=False)
    status = db.Column(db.String,nullable=True)
    admin_comment = db.Column(db.String,nullable=True)
    action = db.Column(db.String,nullable=True)
    Return_date = db.Column(db.Date,nullable=False)
    leave_balances = db.Column(db.Float,nullable=True)
    employee_ID = db.Column(db.Interger,db.ForeignKey('employee.id'),nullable=True)


class Communication(db.Model):
    id = db.Column(db.Interger,primary_key=True)
    admin_ID = db.Column(db.Interger,db.ForeignKey('admin.id'),nullable=True)
    employee_ID = db.Column(db.Interger,db.ForeignKey('employee.id'),nullable=True)
    message = db.Column(db.String,nullable=True)
    timestamp = db.Column(db.DateTime)
    status = db.Column(db.String,nullable=True)
