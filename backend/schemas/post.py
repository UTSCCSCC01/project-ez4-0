from marshmallow import Schema, fields


class PostSchema(Schema):
    id = fields.UUID(description="Post ID")
    content = fields.Str(description="Text content of the post")
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


class CreatePostSchema(Schema):
    content = fields.Str(
        description="Text content of the post",
        required=True
    )
    resources = fields.List(
        fields.Str(),
        description="A list of resource URLs related to this post"
    )
    tags = fields.List(
        fields.Str(),
        description="A list of tags related to this post"
    )
    user_id = fields.UUID(
        description="The user ID of the poster",
        required=True
    )


class GetPostsSchema(Schema):
    posts = fields.List(fields.Nested(PostSchema), description="A list of posts")


class DeletePostSchema(Schema):
    success = fields.Bool(description="If the post is successfully deleted")
