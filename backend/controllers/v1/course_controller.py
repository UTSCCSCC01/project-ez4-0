"""
This controller handles the following APIs:
- GET /api/v1/courses/:id
- GET /api/v1/courses
"""
from flask_apispec import doc, marshal_with
from schemas import (
    CourseSchema,
    GetCoursesSchema
)
from .base_controller import BaseController
from models import Course


@doc(tags=["Course"])
class CourseController(BaseController):
    @doc(description="Get a course by ID")
    @marshal_with(CourseSchema, code=200)
    def get(self, course_id, **_):
        course = Course.query.filter_by(id=course_id).first()
        if course:
            return course
        return {"description": "Course not found"}, 404


@doc(tags=["Course"])
class CoursesController(BaseController):
    @doc(description="Get all available courses")
    @marshal_with(GetCoursesSchema)
    def get(self, **_):
        return {"courses": Course.query.all()}
