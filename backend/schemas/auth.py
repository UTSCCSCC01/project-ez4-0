from marshmallow import Schema, fields


class AuthSchema(Schema):
    email = fields.Str(description="User email", required=True)
    password = fields.Str(description="User password", required=True)


class AuthResponseSchema(Schema):
    success = fields.Bool(description="True if success")
