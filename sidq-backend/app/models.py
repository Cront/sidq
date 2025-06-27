from datetime import datetime, timezone

from .extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(80), nullable=False, unique=False)
    middle_name = db.Column(db.String(160), nullable=True, unique=False)
    last_name = db.Column(db.String(80), nullable=False, unique=False)

    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(512), nullable=False)

    address = db.Column(db.String(225), nullable=True, unique=False)
    phone_number = db.Column(db.String(225), nullable=True, unique=True)

    preferred_currency = db.Column(db.String(80), nullable=True, unique=False)
    timezone = db.Column(db.String(80), nullable=True, unique=False)

    # TODO: gamification & donations related

    email_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(
        timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "email": self.email,
            "address": self.address,
            "phone_number": self.phone_number,
            "preferred_currency": self.preferred_currency,
            "timezone": self.timezone,
            "email_verified": self.email_verified,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(512), nullable=False)

    # mybe orgs could have same address
    address = db.Column(db.String(225), nullable=True, unique=True)
    phone_number = db.Column(db.String(225), nullable=True)
    website_link = db.Column(db.String(225), nullable=True, unique=True)

    org_description = db.Column(db.Text, nullable=True)

    # media storing
    file_name = db.Column(db.String(225), nullable=True)
    # assuming storing a logo or document
    media_data = db.Column(db.LargeBinary, nullable=True)
    # TODO: make sure to handle extracting file type from user uploaded media
    media_type = db.Column(db.String(100), nullable=True)

    created_at = db.Column(db.DateTime(timezone=True),
                           default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(
        timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # return organization name for debugging purposes
    def __repr__(self):
        return f"Organization {self.name}"

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "phone_number": self.phone_number,
            "website_link": self.website_link,
            "file_name": self.file_name,
            "media_data": self.media_data,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
