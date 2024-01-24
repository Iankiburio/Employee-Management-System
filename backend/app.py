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
            employee_id = notification_data['employee_id'],
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


@app.route('/notifications/<int:id>', methods=['POST','DELETE'])
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)

