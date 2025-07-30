from marshmallow import Schema, fields, validate


class UserSignupSchema(Schema):
    first_name = fields.Str(required=True, validate=validate.Length(min=1))
    middle_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=True, validate=validate.Length(min=1))

    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=[
        validate.Length(min=8),
        # validate.Regexp(r'[A-Z]', error='Password must include at least one uppercase letter'),
        # validate.Regexp(r'[a-z]', error='Password must include at least one lowercase letter')
        validate.Regexp(r'^(?=.*[a-z])(?=.*[A-Z]).+$', error='Password must include at least one uppercase and one lowercase letter')
    ])

    email_verified = fields.Bool(required=False, load_default=False)
    address = fields.Str(required=False, allow_none=True)
    phone_number = fields.Str(required=False, allow_none=True)
    preferred_currency = fields.Str(required=False, allow_none=True)
    timezone = fields.Str(required=False, allow_none=True)
