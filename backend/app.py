from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db, Holidaycalendar, Notification

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ems.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

class Index(Resource):

    def get(self):

        response_dict = {
            "index": "Welcome to Employee-Management-System Notifications",
        }

        response = make_response(
            jsonify(response_dict),
            200,
        )

        return response
api.add_resource(Index, '/')


@app.route('/notifications', methods=['GET','POST'])
def notifications():
    
     if request.method == 'GET':
        notifications = [notifications.to_dict() for notifications in Notification.query.all()]
        

        response = make_response(
            jsonify(notifications),
            200
        )
        return response

     elif request.method == 'POST':
        notification_data = request.get_json()
        new_notification = Notification(
            admin_id = notification_data['admin_id'],
            admin_name = notification_data['admin_name'],
            employee_id = notification_data['employee_id'],
            employee_name = notification_data['employee_name'],
            timestamp = notification_data['timestamp'],
            action = notification_data['action'],
        )

        db.session.add(new_notification)
        db.session.commit()

        response = make_response(
            jsonify(new_notification.to_dict()),
            201
        )
        return notification_data


@app.route('/notifications/<int:notification_id>', methods=['POST','DELETE'])
def get_approval(notification_id):
    
    approval = Notification.query.filter_by(notification_id=notification_id).first()


    if request.method == 'POST':
        notification_data = request.get_json()
        for attr in notification_data:
            setattr(approval,attr,notification_data[attr])

            db.session.add(approval)
            db.session.commit()

            response = make_response(
                jsonify(
                
                {
                "message": "Your Leave has been approved."
            }
            ),
            200
        )
    
        return response
            
    
    elif request.method == 'DELETE':
       
        db.session.delete(approval)
        db.session.commit()

        response = make_response(
            jsonify(
                
                {
                "message": "Notifications deleted Successfully."
            }
            ),
            200
        )
    
        return response

#CALENDAR that displays all the days and months of the week
    
import calendar   
#year = int(input('Enter the year to be displayed'))
#print(calendar.prcal(year)) # go to the terminal and run python app.py then enter the year to display.
#function to create a holiday calendar

def get_holiday_calendar(holiday, company):
    holiday_data = {
        'holiday_id': holiday.id,
        'holiday_name': holiday.name,
        'holiday_date': holiday.date,
        'event_id': company.event_id,
        'event_title': company.event_title,
        'event_start' : company.event_start,
        'event_end' : company.event_end
    }

    return holiday_data

#company events
@app.route('/events', methods=['POST'])
def create_event():
    event = request.json
    new_event = Holidaycalendar(
        event_id = event.get('company_event_id'),
        event_title = event.get('title'),
        event_start = event.get('start_date'),
        event_end = event.get('end_date'),
    )

    db.session.add(new_event)
    db.session.commit()

    return jsonify({
        'success': True,
        'event': 'New event has been created'}), 201

@app.route('events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Holidaycalendar.query.filter(event_id = event_id).all()
    if event is None:
        return "No event created"
    return jsonify({"event": "We have a company event"}), 200

@app.route('events', methods=['DELETE'])
def delete(event_id):
        company_event = Holidaycalendar.query.filter_by(event_id=event_id).all()

        db.session.delete(company_event)
        db.session.commit()

        return jsonify({"message": "Event successfully deleted"})

#Holidays
@app.route('/holidays', methods=['GET'])
def get_all_holidays():
    data = Holidaycalendar.query.all()
    data = {
        'holiday_id': data.holiday_id,
        'holiday_name': data.holiday_name, #Mashujaa day, new year, labor day, Christmas
        'holiday_date': data.holiday_date #[January, May, June, October, December]
    }

    return jsonify(data)

@app.route('holidays/<int:holiday_id>', methods=['GET'])
def get_holiday(holiday_id):
    holiday = Holidaycalendar.query.filter(holiday_id = holiday_id).all()
    if holiday:
        return jsonify({'holiday': holiday})
    
    else:
        return jsonify({'message': 'normal working day'})
    

if __name__ == '__main__':
    app.run(port=5555, debug=True)






