from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

from ..models import Organization, User

login_bp = Blueprint('login_bp', __name__)


@login_bp.route('/', methods=["GET"])
def routes_home():
    return "Login home"


@login_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_token = create_access_token(identity=identity)
    return jsonify(access_token=new_token), 200


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
        if not check_password_hash(user.password, password):
            return (jsonify({"message": "Incorrect password"}))

        access_token = create_access_token(
            identity=str(user.id))
        refresh_token = create_refresh_token(
            identity=str(user.id))

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.first_name,
                "type": "user",
            }
        }), 200

    if org:
        if not check_password_hash(org.password, password):
            return (jsonify({"message": "Incorrect password"}))

        access_token = create_access_token(
            identity=str(org.id))

        refresh_token = create_refresh_token(
            identity=str(org.id))

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": org.id,
                "email": org.email,
                "name": org.name,
                "type": "organization",
            }
        }), 200
