from faker import Faker
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from app import app, db  # Adjust this import
from models import Employee, Payroll, Attendance  # Adjust this import

fake = Faker()

# Set up the Flask application context
app.app_context().push()


def seed_data():
    # Create employees
    employees = []
    for _ in range(5):
        employee = Employee(name=fake.name())
        employees.append(employee)
        db.session.add(employee)

    db.session.commit()

    # Create payroll entries for each employee
    for employee in employees:
        for month in range(1, 13):
            # Assuming current year
            year = datetime.now().year
            base_salary = fake.random_int(min=50000, max=100000)
            deductions_percentage = fake.random.uniform(0, 0.2)
            bonuses_percentage = fake.random.uniform(0, 0.1)
            tax_percentage = fake.random.uniform(0.1, 0.3)

            payroll = Payroll(
                employee_id=employee.id,
                month=month,
                year=year,
                base_salary=base_salary,
                deductions_percentage=deductions_percentage,
                bonuses_percentage=bonuses_percentage,
                tax_percentage=tax_percentage
            )

            db.session.add(payroll)

    db.session.commit()

    # Create attendance records for each employee
    for employee in employees:
        for _ in range(5):  # Create 20 attendance records per employee
            clock_in_time = fake.date_time_this_year()
            clock_out_time = clock_in_time + timedelta(hours=fake.random_int(min=1, max=8))

            attendance = Attendance(
                employee_id=employee.id,
                clock_in_time=clock_in_time,
                clock_out_time=clock_out_time
            )

            db.session.add(attendance)

    db.session.commit()

if __name__ == '__main__':
    seed_data()
    print('Seed data added successfully.')