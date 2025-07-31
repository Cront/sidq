from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash

from ..extensions import db
from ..models import Organization, User
from ..schemas.organization_schema import OrganizationSignupSchema

organization_bp = Blueprint('organization_bp', __name__)
organization_schema = OrganizationSignupSchema()


@organization_bp.route('/', methods=["GET"])
def organization_home():
    return "Organization home"


@organization_bp.route('/delete_org_account/<int:user_id>', methods=["DELETE"])
def delete_org_account(user_id):
    organization = Organization.query.get(user_id)

    if not organization:
        return jsonify({"message": "Organization not found"}), 404

    db.session.delete(organization)
    db.session.commit()

    return jsonify({"message": "Organization deleted"}), 200


@organization_bp.route('/delete_all_org_accounts', methods=["DELETE"])
def delete_all_org_accounts():
    """Function to delete all organization accounts in db"""
    try:
        num_deleted = Organization.query.delete()
        db.session.commit()

        return jsonify({
            "message": "All orgs deleted",
            "count": num_deleted
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Failed to delete organizations",
            "error": str(e)
        }), 500


@organization_bp.route('/create_org_account', methods=["POST"])
def create_org_account():
    """Create a new organization account to use Sidq"""

    try:
        data = organization_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    email = data["email"]

    # TODO: media data storage

    # check same email not already used
    if Organization.query.filter_by(email=email).first() or User.query.filter_by(email=email).first():
        return (jsonify({"message": "Email already in use"}), 409)

    new_org = Organization(
        name=data["name"],
        email=email,
        password=generate_password_hash(data["password"], method='pbkdf2:sha256', salt_length=16),
        address=data.get("address"),
        phone_number=data.get("phone_number"),
        website_link=data.get("website_link")
    )

    try:
        db.session.add(new_org)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "Organization account created!"}), 201
