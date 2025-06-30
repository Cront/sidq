from flask import Blueprint, jsonify, request
from werkzeug import security

from ..models import Organization, User

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/', methods=["GET"])
def routes_home():
    return "Login home"

@login_bp.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email: 
        return (jsonify({"message": "You must include your email"}))
    if not password:
        return (jsonify({"message": "You must include your password"}))

    user = User.query.filter_by(email=email).first()
    org = Organization.query.filter_by(email=email).first()

    if not user and not org:
        return (jsonify({"message": "Account does not exist"}))

    if user:
        if not security.check_password_hash(user.password, password):
            return (jsonify({"message": "Incorrect password"}))

        token = create_access_token(identity={"id": user.id, "type": "user"})

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.first_name,
                "type": "user",
            }
        }), 200

    if org:
        if not security.check_password_hash(org.password, password):
            return (jsonify({"message": "Incorrect password"}))

        token = create_access_token(identity={"id": org.id, "type": "organization"})

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": org.id,
                "email": org.email,
                "name": org.name,
                "type": "organization",
            }
        }), 200
