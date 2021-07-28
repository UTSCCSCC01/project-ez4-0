from marshmallow import Schema, fields
from .video import VideoSchema


class CourseSchema(Schema):
    id = fields.UUID(description="Course ID")
    name = fields.Str(description="Course name")
    category = fields.Str(description="Course category")
    description = fields.Str(description="Description of the course")
    videos = fields.List(
        fields.Nested(VideoSchema),
        description="A list of videos of the course"
    )


class CourseQuerySchema(Schema):
    keyword = fields.Str(description="The keyword to search for")
    category = fields.Str(description="The category to search for")


class GetCoursesSchema(Schema):
    courses = fields.List(
        fields.Nested(CourseSchema),
        description="A list of courses"
    )
