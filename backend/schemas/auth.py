from marshmallow import Schema, fields


class AuthSchema(Schema):
    email = fields.Str(description="User email", required=True)
    password = fields.Str(description="User password", required=True)


class AuthResponseSchema(Schema):
    success = fields.Bool(description="True if success")
    user_id = fields.UUID(description="The corresponding user ID")
    avatar = fields.Str(description="URL to the user avatar")
