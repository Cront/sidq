from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models import Organization

organization_bp = Blueprint('organization_bp', __name__)

@organization_bp.route('/organization_bp')
def organization_home():
    return "Organization home"
