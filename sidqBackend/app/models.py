from datetime import datetime, timezone

from . import db


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)

    address = db.Column(db.String(225), nullable=True, unique=True)
    phoneNumber = db.Column(db.String(225), nullable=True)
    websiteLink = db.Column(db.String(225), nullable=True, unique=True)

    # media storing 
    fileName = db.Column(db.String(225), nullable=True)
    mediaData = db.Column(db.LargeBinary, nullable=True)  # assuming storing a logo or document
    mediaType = db.Column(db.String(100), nullable=True) # TODO: make sure to handle extracting file type from user uploaded media

    createdAt = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updatedAt = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # return organization name for debugging purposes
    def __repr__(self):
        return f"Organization {self.name}"
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "phoneNumber": self.phoneNumber,
            "websiteLink": self.websiteLink,
            "fileName": self.fileName,
            "mediaData": self.mediaData,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
