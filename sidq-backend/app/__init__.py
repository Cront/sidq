from app.routes.organization_routes import organization_bp
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from .config import Config
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(organization_bp, url_prefix='/organization')

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from .models import Organization

    return app

