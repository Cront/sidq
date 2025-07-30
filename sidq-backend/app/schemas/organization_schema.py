from marshmallow import Schema, fields, validate


class OrganizationSignupSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=[
        validate.Length(min=8),
        # validate.Regexp(r'[A-Z]', error='Must contain at least one uppercase letter.')
        # validate.Regexp(r'[a-z]', error='Must contain at least one lowercase letter.')
        validate.Regexp(r'^(?=.*[a-z])(?=.*[A-Z]).+$', error='Password must include at least one uppercase and one lowercase letter')
    ])
