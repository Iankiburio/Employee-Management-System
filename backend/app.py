from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from models import db,Employee_Leaverequest, Leavetype
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.ocehkzakvorfyqxagyno:sPA3ob0kZELARFQS@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)



@app.route('/')
def hello():
    return 'Hello, World!'


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
    #db.create_all()
    app.run(debug=True)

