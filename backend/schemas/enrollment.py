from marshmallow import Schema, fields


class EnrollmentSchema(Schema):
    id = fields.Str(description="Enrollment ID")
    course_id = fields.UUID(description="Course ID")
    user_id = fields.UUID(description="User ID")
    finished = fields.List(fields.UUID(), description="A list of finished video IDs")


class CreateEnrollmentSchema(Schema):
    course_id = fields.UUID(description="Course ID", required=True)


class UpdateFinishVideoSchema(Schema):
    enrollment_id = fields.Str(description="Enrollment ID", required=True)
    video_id = fields.UUID(description="Video ID that has watched", required=True)


class UserEnrollmentsSchema(Schema):
    enrollments = fields.List(fields.Nested(EnrollmentSchema))
