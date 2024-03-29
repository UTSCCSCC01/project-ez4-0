from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.UUID(description="User ID")
    email = fields.Str(description="User email")
    first_name = fields.Str(description="User first name")
    last_name = fields.Str(description="User last name")
    avatar = fields.Str(description="The URL to the user avatar")
    gender = fields.Str(description="User geneder")
    phone_number = fields.Str(description="User phone number")
    birthdate = fields.Date(description="User birthdate")
    address = fields.Str(description="User address")
    bio = fields.Str(description="User bio")


class CreateUserSchema(Schema):
    email = fields.Str(description="User email", required=True)
    password = fields.Str(description="The raw(unhashed) password", required=True)
    first_name = fields.Str(description="User first name", required=True)
    last_name = fields.Str(description="User last name", required=True)


class UpdateUserSchema(Schema):
    email = fields.Str(description="User email")
    first_name = fields.Str(description="User first name")
    last_name = fields.Str(description="User last name")
    gender = fields.Str(description="User geneder")
    phone_number = fields.Str(description="User phone number")
    birthdate = fields.Date(description="User birthdate")
    address = fields.Str(description="User address")


class DeleteUserResponseSchema(Schema):
    success = fields.Bool(description="True if successfully deleted")
