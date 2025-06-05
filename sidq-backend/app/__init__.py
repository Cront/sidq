from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate
from .routes.organization_routes import organization_bp
from .routes.user_routes import user_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(organization_bp, url_prefix='/organization')
    app.register_blueprint(user_bp, url_prefix='/user')

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from .models import Organization, User

    return app
