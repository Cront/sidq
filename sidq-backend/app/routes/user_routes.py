from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash

from ..extensions import db
from ..models import User

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/', methods=["GET"])
def user_home():
    return "User home"


@user_bp.route('/create_user_account', methods=["POST"])
def create_user_account():
    """Create an user account to use Sidq"""
    data = request.get_json()

    # required fields
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    email_verified = data.get("email_verified", False)

    # optional fields
    address = data.get("address")
    phone_number = data.get("phone_number")
    preferred_currency = data.get("preferred_currency")
    timezone = data.get("timezone")

    if not name:
        return jsonify({"message": "You must include user's name"}), 400
    if not email:
        return jsonify({"message": "You must include user's email"}), 400
    if not password:
        return jsonify({"message": "You must include user's password"}), 400

    if User.query.filter_by(email=email).first():
        return (jsonify({"message": "Email already in use"}), 409)

    if phone_number and User.query.filter_by(phone_number=phone_number).first():
        return (jsonify({"message": "Phone number already in use"}), 409)

    new_user = User(
        name=name,
        email=email,
        password=generate_password_hash(password),
        email_verified=email_verified,
        address=address,
        phone_number=phone_number,
        preferred_currency=preferred_currency,
        timezone=timezone
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User account created!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}, 500)


@user_bp.route('/delete_all_user_accounts', methods=["DELETE"])
def delete_all_user_accounts():
    try:
        num_deleted = User.query.delete()
        db.session.commit()

        return jsonify({
            "message": "All user accounts deleted",
            "count": num_deleted
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Unable to delete all user accounts",
            "error": str(e)
        }), 500


@user_bp.route('/delete_user_account/<int:user_id>', methods=["DELETE"])
def delete_user_account(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User does not exist in the database"})

    db.session.delete(user_id)
    db.session.commit()

    return jsonify({"message": "user account deleted"})
