from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__) # init Flask app 

CORS(app) # Enable CORS (frontend backend comms)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://sidq_dev:786Y3liS!dq@localhost:5432/sidq_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
