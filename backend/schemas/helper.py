from marshmallow import Schema, fields


class ErrorResponseSchema(Schema):
    description = fields.Str(description="Description of the error")
