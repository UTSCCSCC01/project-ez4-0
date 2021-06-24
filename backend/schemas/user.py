from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.UUID(description="User ID")
    email = fields.Str(description="User email")
    first_name = fields.Str(description="User first name")
    last_name = fields.Str(description="User last name")


class CreateUserSchema(Schema):
    email = fields.Str(description="User email", required=True)
    password = fields.Str(description="The raw(unhashed) password", required=True)
    first_name = fields.Str(description="User first name", required=True)
    last_name = fields.Str(description="User last name", required=True)


class UpdateUserSchema(Schema):
    email = fields.Str(description="User email")
    first_name = fields.Str(description="User first name")
    last_name = fields.Str(description="User last name")


class DeleteUserResponseSchema(Schema):
    success = fields.Bool(description="True if successfully deleted")
