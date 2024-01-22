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

class Notification(Resource):
    def get(self):
        notifications = Notification.query.all()

        response = make_response(
            jsonify(notifications),
            200,
        )
        
        return response
    
    def post(self):
        notification_data = request.get_json()
        new_notifications = Notification(
            admin_id = notification_data['admin_id'],
            employee_id = notification_data['employee_id'],
            timestamp = notification_data['timestamp'],
            action = notification_data['action'],
        )
        db.session.add(new_notifications)
        db.session.commit()

        response_dict = new_notifications.to_dict()

        response= make_response(
            jsonify(response_dict), 201
        )

        return response
    
api.add_resource(Notification, '/notifications')    

    
class NotificationbyId(Resource): #retrieve a single notification
    def get(self,id):
        response_dict = Notification.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )

        return response
    


#class NotificationbyId(Resource): #Delete a specific notification

    def delete(self,id):
        notifications = Notification.query.filter_by(id=id).first()

        db.session.delete(notifications)
        db.session.commit()

        response_dict = {"message": "Notification successfully deleted"}

        response = make_response(
            jsonify(response_dict), 200
        )

        return response
    
app.add_resource(NotificationbyId, '/notifications/<int:id>')    


if __name__ == '__main__':
    app.run(port=5554, debug=True)

