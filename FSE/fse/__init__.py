from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Wales.Golf.Madrid.'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fse_sqlite.db'
db = SQLAlchemy(app)

from fse import routes