from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Communication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, nullable=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    communications_sent = db.relationship('Communication', backref='sender', lazy=True, foreign_keys='Communication.sender_id')
    communications_received = db.relationship('Communication', backref='receiver', lazy=True, foreign_keys='Communication.receiver_id')


@app.route('/communications', methods=['GET'])
def get_all_communications():
    communications = Communication.query.all()
    result = [
        {
            'id': communication.id,
            'sender_id': communication.sender_id,
            'receiver_id': communication.receiver_id,
            'message': communication.message,
            'timestamp': communication.timestamp.isoformat(),
            'status': communication.status
        }
        for communication in communications
    ]
    return jsonify(result)


@app.route('/communications/<int:communication_id>', methods=['GET'])
def get_communication(communication_id):
    communication = Communication.query.get_or_404(communication_id)
    result = {
        'id': communication.id,
        'sender_id': communication.sender_id,
        'receiver_id': communication.receiver_id,
        'message': communication.message,
        'timestamp': communication.timestamp.isoformat(),
        'status': communication.status
    }
    return jsonify(result)


@app.route('/communications', methods=['POST'])
def create_communication():
    data = request.json
    new_communication = Communication(
        sender_id=data.get('sender_id'),
        receiver_id=data.get('receiver_id'),
        message=data.get('message'),
        status=data.get('status')
    )

    db.session.add(new_communication)
    db.session.commit()

    return jsonify({'message': 'Communication created successfully'}), 201


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)