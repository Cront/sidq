from marshmallow import Schema, fields, validate


class OrganizationSignupSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=[
        validate.Length(min=8),
        validate.Regexp(
            r'^(?=.*[a-z])(?=.*[A-Z]).+$', error='Password must contain at least one uppercase and one lowercase letter'
        )
    ])

    # optional fields
    address = fields.Str(required=False, allow_none=True)
    phone_number = fields.Str(required=False, allow_none=True)
    website_link = fields.Url(required=False, allow_none=True)
