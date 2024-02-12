from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


db = SQLAlchemy()

        
class Payroll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    employee = db.relationship('Employee', back_populates='payrolls')
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


class Employee(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(200), nullable=False)
    last_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    department = db.Column(db.String(200), nullable=False)
    payrolls = db.relationship('Payroll', back_populates='employee')
    role = db.Column(db.String(200), nullable=False)
    bank_account = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(200), nullable=False)
    joining_date = db.Column(db.Date, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    contact = db.Column(db.String(15), nullable=False)

class EmployeeBalances(db.Model):
    __tablename__ = 'employee_balances'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False, unique=True)
    annual_leave = db.Column(db.Integer, nullable=False, default=30)
    annual_leave_entitled = db.Column(db.Integer, nullable=False, default=30)
    study_leave = db.Column(db.Integer, nullable=False, default=15)
    study_leave_entitled = db.Column(db.Integer, nullable=False, default=15)
    sick_leave = db.Column(db.Integer, nullable=False, default=20)
    maternity_leave=db.Column(db.Integer, nullable=False, default=90)
    maternity_leave_entitled=db.Column(db.Integer, nullable=False, default=90)
    pertenity_leave=db.Column(db.Integer, nullable=False, default=14)
    pertenity_leave_entitled=db.Column(db.Integer, nullable=False, default=14)

    employee = db.relationship('Employee', backref='balance', uselist=False)

    def __repr__(self):
        return f"EmployeeBalances(id={self.id}, employee_id={self.employee_id}, annual_leave={self.annual_leave}, study_leave={self.study_leave})"


class EmployeeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Employee

employee_schema = EmployeeSchema()

# Add validation methods to the Employee class
def validate_email(self):
    if '@' not in self.email:
        raise ValueError('Invalid email address')

def validate_password(self, password):
    # Password must be at least 6 characters long
    if len(password) < 6:
        raise ValueError('Password must be at least 6 characters long')

    # Password must contain at least one uppercase letter
    if not any(char.isupper() for char in password):
        raise ValueError('Password must contain at least one uppercase letter')

    # Password must contain at least one special character
    special_characters = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
    if not any(char in special_characters for char in password):
        raise ValueError('Password must contain at least one special character')

class Admin(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(200), nullable=False)
    last_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def validate_email(self):
        if '@' not in self.email:
            raise ValueError('Invalid email address')


        
class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)


class Leavetype(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    leave_description = db.Column(db.String,nullable=False)
    leave_days = db.Column(db.Integer,nullable=False)
    gender = db.Column(db.String,nullable=False)
    leave_balances = db.Column(db.Float,nullable=False)

class Holidaycalendar(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    holiday_date = db.Column(db.Date,nullable=False)
    holiday_name = db.Column(db.String,nullable=False)
    company_eventID = db.Column(db.Integer,primary_key=True)
    company_event_description = db.Column(db.String,nullable=False)


class Attendance(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    employee_ID = db.Column(db.Integer,db.ForeignKey('employee.id'),nullable=True)
    clock_in = db.Column(db.DateTime)
    clock_out = db.Column(db.DateTime)
    date = db.Column(db.Date,nullable=False)

class Notification(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    admin_ID = db.Column(db.Integer,db.ForeignKey('admin.id'),nullable=True)
    employee_ID = db.Column(db.Integer,db.ForeignKey('employee.id'),nullable=True)
    timestamp = db.Column(db.DateTime)
    action = db.Column(db.String,nullable=False)

class Employee_Leaverequest(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    leavetype_ID = db.Column(db.Integer,db.ForeignKey('leavetype.id'),nullable=True)
    start_date = db.Column(db.Date,nullable=False)
    end_date = db.Column(db.Date,nullable=False)
    status = db.Column(db.String,nullable=True)
    admin_comment = db.Column(db.String,nullable=True)
    action = db.Column(db.String,nullable=True)
    Return_date = db.Column(db.Date,nullable=False)
    leave_balances = db.Column(db.Float,nullable=True)
    employee_ID = db.Column(db.Integer,db.ForeignKey('employee.id'),nullable=True)

    


class Communication(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    admin_ID = db.Column(db.Integer,db.ForeignKey('admin.id'),nullable=True)
    employee_ID = db.Column(db.Integer,db.ForeignKey('employee.id'),nullable=True)
    message = db.Column(db.String,nullable=True)
    timestamp = db.Column(db.DateTime)
    status = db.Column(db.String,nullable=True)
