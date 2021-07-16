from marshmallow import Schema, fields
from .video import VideoSchema


class CourseSchema(Schema):
    id = fields.UUID(description="Course ID")
    name = fields.Str(description="Course name")
    description = fields.Str(description="Description of the course")
    videos = fields.List(
        fields.Nested(VideoSchema),
        description="A list of videos of the course"
    )


class GetCoursesSchema(Schema):
    courses = fields.List(
        fields.Nested(CourseSchema),
        description="A list of courses"
    )
