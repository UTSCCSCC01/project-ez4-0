"""
This controller handles the following APIs:
- GET /api/v1/courses/:id
- GET /api/v1/courses
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    CourseSchema,
    GetCoursesSchema,
    GetCourseCategoriesSchema,
)
from schemas.course import CourseQuerySchema
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
    @use_kwargs(CourseQuerySchema)
    @marshal_with(GetCoursesSchema)
    def get(self, **kwargs):
        keyword = kwargs.get("keyword")
        category = kwargs.get("category")
        if keyword and category:
            courses = Course.query.filter(
                Course.name.like(f"%{keyword}%"),
                Course.category == category
            )
        elif keyword:
            courses = Course.query.filter(Course.name.like(f"%{keyword}%"))
        elif category:
            courses = Course.query.filter(Course.category == category)
        else:
            courses = Course.query.all()
        return {"courses": courses}


@doc(tags=["Course Category"])
class CourseCategoryController(BaseController):
    @doc(description="Get all possible categories")
    @marshal_with(GetCourseCategoriesSchema)
    def get(self, **_):
        categories = []
        courses = Course.query.all()
        for course in courses:
            c = course.category
            if c and c not in categories:
                categories.append(c)
        return {"categories": categories}
