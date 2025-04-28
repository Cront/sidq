from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

from ..extensions import db
from ..models import Organization

organization_bp = Blueprint('organization_bp', __name__)

@organization_bp.route('/', methods=["GET"])
def organization_home():
    return "Organization home"

@organization_bp.route('/create_org_account', methods=["POST"])
def create_org_account():
    """Create a new organization account to use Sidq"""
    # parse entire JSON body first
    data = request.get_json()

    # required fields
    name = data.get("name") 
    email = data.get("email")
    password = data.get("password")

    # optional fields
    address = data.get("address")
    phone_number = data.get("phone_number")
    website_link = data.get("website_link")

    # TODO: media data storage

    # check that required fields given
    if not name:
        return (jsonify({"message": "You must include organization name"}), 400)
    if not email:
        return (jsonify({"message": "You must include organization email"}), 400)
    if not password:
        return (jsonify({"message": "You must include a password"}), 400)

    # check same email not already used
    if Organization.query.filter_by(email=email).first():
        return (jsonify({"message": "Email already in use"}), 409)


    new_org = Organization(
        name=name,
        email=email,
        password=generate_password_hash(password),
        address=address,
        phone_number=phone_number,
        website_link=website_link
    )

    try:
        db.session.add(new_org)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}, 500)

    return jsonify({"message": "Organization account created!"}, 201)

