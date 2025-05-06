from datetime import datetime, timezone

from .extensions import db


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(512), nullable=False)

    address = db.Column(db.String(225), nullable=True, unique=True) # mybe orgs could have same address
    phone_number = db.Column(db.String(225), nullable=True)
    website_link = db.Column(db.String(225), nullable=True, unique=True)

    org_description = db.Column(db.Text, nullable=True)

    # media storing 
    file_name = db.Column(db.String(225), nullable=True)
    media_data = db.Column(db.LargeBinary, nullable=True)  # assuming storing a logo or document
    media_type = db.Column(db.String(100), nullable=True) # TODO: make sure to handle extracting file type from user uploaded media

    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

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
