from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from .models import db, Admin, Employee, Payroll, User
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ems.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

