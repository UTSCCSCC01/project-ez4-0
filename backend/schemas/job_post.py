from marshmallow import Schema, fields


class JobPostSchema(Schema):
    id = fields.UUID(description="Job post ID")
    title = fields.Str(description="Job title")
    description = fields.Str(description="Description of the job")
    requirements = fields.List(
        fields.Str(),
        description="A list of job requirements"
    )
    resources = fields.List(
        fields.Str(),
        description="A list of resource URLs related to this post"
    )
    tags = fields.List(
        fields.Str(),
        description="A list of tags related to this post"
    )
    posted_at = fields.DateTime(description="The timestamp of the post")
    user_id = fields.UUID(description="The user ID of the poster")
    active = fields.Bool(description="Whether or not this post is active")


class CreateJobPostSchema(Schema):
    title = fields.Str(
        description="Job title",
        required=True
    )
    description = fields.Str(
        description="Description of the job"
    )
    requirements = fields.List(
        fields.Str(),
        description="A list of job requirements"
    )
    resources = fields.List(
        fields.Str(),
        description="A list of resource URLs related to this job post"
    )
    tags = fields.List(
        fields.Str(),
        description="A list of tags related to this job post"
    )
    user_id = fields.UUID(
        description="The user ID of the poster",
        required=True
    )
    active = fields.Bool(
        description="Whether or not this post is active",
        required=True
    )


class QueryJobPostsSchema(Schema):
    posted_by = fields.UUID(description="Filter job posts by the user id")
    tags = fields.Str(description="Filter job posts by tags separated by comma")
    keyword = fields.Str(description="Filter job posts by keyword")
    active = fields.Bool(description="Filter job posts by active")


class GetJobPostsSchema(Schema):
    job_posts = fields.List(fields.Nested(JobPostSchema), description="A list of job posts")


class DeleteJobPostSchema(Schema):
    success = fields.Bool(description="If the job post is successfully deleted")


class UpdateJobPostSchema(Schema):
    title = fields.Str(
        description="Job title"
    )
    description = fields.Str(
        description="Description of the job"
    )
    requirements = fields.List(
        fields.Str(),
        description="A list of job requirements"
    )
    resources = fields.List(
        fields.Str(),
        description="A list of resource URLs related to this job post"
    )
    tags = fields.List(
        fields.Str(),
        description="A list of tags related to this job post"
    )
    active = fields.Bool(
        description="Whether or not this post is active",
    )
