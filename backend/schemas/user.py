from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.UUID(description="User ID")
    email = fields.Str(description="User email")


class CreateUserSchema(Schema):
    email = fields.Str(description="User email", required=True)
    password = fields.Str(description="The raw(unhashed) password", required=True)


class UpdateUserSchema(Schema):
    email = fields.Str(description="User email")


class DeleteUserResponseSchema(Schema):
    success = fields.Bool(description="True if successfully deleted")
