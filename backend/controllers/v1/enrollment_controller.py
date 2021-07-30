"""
This controller handles the following APIs:
- GET /api/v1/enrollments/:id
- GET /api/v1/users/:user_id/enrollments
- PATCH /api/v1/users/:user_id/enrollments
- POST /api/v1/users/:user_id/enrollments
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    EnrollmentSchema,
    UpdateFinishVideoSchema,
    CreateEnrollmentSchema,
    UserEnrollmentsSchema,
)
from .base_controller import BaseController
from models import User
from documents.enrollment import Enrollment
from models.course import Course


@doc(tags=["Enrollment"])
class EnrollmentController(BaseController):
    @doc(description="Get an enrollment by ID")
    @marshal_with(EnrollmentSchema, code=200)
    def get(self, enrollment_id, **_):
        enrollment = Enrollment.objects(id=enrollment_id).first()
        if enrollment:
            return enrollment
        return {"description": "Enrollment not found"}, 404


@doc(tags=["User Enrollment"])
class UserEnrollmentsController(BaseController):
    @doc(description="Get all enrollments by user ID")
    @marshal_with(UserEnrollmentsSchema)
    def get(self, user_id, **_):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"description": "User not found"}, 404
        enrollments = Enrollment.objects(user_id=user_id).all()
        return {"enrollments": enrollments}
    
    @doc(description="Enrol a user into the given course")
    @use_kwargs(CreateEnrollmentSchema)
    @marshal_with(EnrollmentSchema)
    def post(self, user_id, course_id, **_):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"description": "User not found"}, 404
        course = Course.query.filter_by(id=course_id).first()
        if not course:
            return {"description": "Course not found"}, 404
        enrollment = Enrollment(
            user_id=user_id,
            course_id=course_id
        ).save()
        return enrollment

    @doc(description="Add the video to the enrollment finished list")
    @use_kwargs(UpdateFinishVideoSchema)
    @marshal_with(EnrollmentSchema)
    def patch(self, user_id, enrollment_id, video_id, **_):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"description": "User not found"}, 404
        enrollment = Enrollment.objects(id=enrollment_id).first()
        if not enrollment:
            return {"description": "Enrollment not found"}, 404
        if video_id not in enrollment.finished:
            finished = enrollment.finished
            finished.append(video_id)
            enrollment.finished = finished
        return enrollment.save()
