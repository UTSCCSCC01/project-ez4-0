"""
This controller handles the following APIs:
- GET /api/v1/job_posts/:id
- GET /api/v1/job_posts
- POST /api/v1/job_posts
- PATCH /api/v1/job_posts/:id
- DELETE /api/v1/job_posts/:id
"""
from flask_apispec import doc, marshal_with, use_kwargs
from schemas import (
    JobPostSchema,
    CreateJobPostSchema,
    GetJobPostsSchema,
    DeleteJobPostSchema,
    QueryJobPostsSchema,
    UpdateJobPostSchema,
)
from .base_controller import BaseController
from models import User
from documents.job_post import JobPost
from datetime import datetime
from bson import ObjectId


@doc(tags=["Job Post"])
class JobPostsController(BaseController):
    @doc(description="Create a job post")
    @use_kwargs(CreateJobPostSchema)
    @marshal_with(JobPostSchema)
    def post(self, title, user_id, active, **kwargs):
        user =  User.find_by_id(user_id)
        if not user:
            return {"description": f"User with id {user_id} not found"}, 404
        job_post = JobPost(
            title=title,
            description=kwargs.get("description", ""),
            requirements=kwargs.get("requirements", []),
            user_id=user_id,
            active=active,
            posted_at=datetime.now(),
            resources=kwargs.get("resources", []),
            tags=kwargs.get("tags", []),
        )
        return job_post.save()

    @doc(description="Get job posts", location=("query",))
    @use_kwargs(QueryJobPostsSchema)
    @marshal_with(GetJobPostsSchema)
    def get(self, **kwargs):
        query = {}
        # Query by tags
        tags = kwargs.get("tags")
        if tags:
            query["tags__in"] = tags.split(",")
        # Query by posts onwer
        posted_by = kwargs.get("posted_by")
        if posted_by:
            query["user_id"] = posted_by
        # Query by keyword
        keyword = kwargs.get("keyword")
        if keyword:
            query["content__contains"] = keyword
        # Query by active or not
        active = kwargs.get("active")
        if active:
            query["active"] = active
        return {
            "job_posts": JobPost.objects(**query)
        }


@doc(tags=["Job Post"])
class JobPostController(BaseController):
    @doc(description="Get a job post by its ID")
    @marshal_with(JobPostSchema)
    def get(self, job_post_id):
        if not ObjectId.is_valid(job_post_id):
            return {"description": f"Invalid id {job_post_id}"}, 400
        job_post = JobPost.objects(id=job_post_id).first()
        if not job_post:
            return {"description": f"Job post with id {job_post_id} not found"}, 404
        return job_post
    
    @doc(description="Update a job post")
    @marshal_with(JobPostSchema)
    @use_kwargs(UpdateJobPostSchema)
    def patch(self, job_post_id, **kwargs):
        if not ObjectId.is_valid(job_post_id):
            return {"description": f"Invalid id {job_post_id}"}, 400
        job_post = JobPost.objects(id=job_post_id).first()
        if not job_post:
            return {"description": f"Job post with id {job_post_id} not found"}, 404
        job_post.title = kwargs.get("title", job_post.title)
        job_post.description = kwargs.get("description", job_post.description)
        job_post.requirements = kwargs.get("requirements", job_post.requirements)
        job_post.resources = kwargs.get("resources", job_post.resources)
        job_post.tags = kwargs.get("tags", job_post.tags)
        job_post.active = kwargs.get("active", job_post.active)
        return job_post.save()
    
    @doc(description="Delete a job post by its ID")
    @marshal_with(DeleteJobPostSchema)
    def delete(self, job_post_id):
        if not ObjectId.is_valid(job_post_id):
            return {"description": f"Invalid id {job_post_id}"}, 400
        post = JobPost.objects(id=job_post_id).first()
        if not post:
            return {"description": f"Post with id {job_post_id} not found"}, 404
        post.delete()
        return {"success": True}
