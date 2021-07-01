from marshmallow import Schema, fields


class PostSchema(Schema):
    id = fields.UUID(description="Post ID")
    title = fields.Str(description="Title of the post")
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
    title = fields.Str(
        description="Title of the post",
        required=True
    )

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


class QueryPostsSchema(Schema):
    posted_by = fields.UUID(description="Filter posts by the user id")
    tags = fields.Str(description="Filter posts by tags separated by comma")
    keyword = fields.Str(description="Filter posts by keyword")


class GetPostsSchema(Schema):
    posts = fields.List(fields.Nested(PostSchema), description="A list of posts")


class DeletePostSchema(Schema):
    success = fields.Bool(description="If the post is successfully deleted")


class DeleteCommentSchema(Schema):
    success = fields.Bool(description="If the comment is successfully deleted")


class UndoLikeSchema(Schema):
    success = fields.Bool(description="If the like is successfully undo")


class PostCommentSchema(Schema):
    id = fields.Str(description="ID of the comment")
    content = fields.Str(description="Content of the comment")
    resources = fields.Str(description="A list of resource URLs related to this comment")
    user_id = fields.UUID(description="The user ID of the comment poster")
    posted_at = fields.DateTime(description="The timestamp of the comment")


class PostLikeSchema(Schema):
    id = fields.Str(description="ID of the like")
    user_id = fields.UUID(description="The user ID of the liker")
    liked_at = fields.DateTime(description="The timestamp of the like")


class CreatePostCommentSchema(Schema):
    content = fields.Str(
        description="Content of the comment",
        required=True
    )
    resources = fields.Str(
        description="A list of resource URLs related to this comment"
    )
    user_id = fields.UUID(
        description="The user ID of the comment poster",
        required=True
    )


class CreatePostLikeSchema(Schema):
    user_id = fields.UUID(
        description="The user ID of the liker",
        required=True
    )


class GetPostCommentsSchema(Schema):
    comments = fields.List(fields.Nested(PostCommentSchema))


class GetPostLikesSchema(Schema):
    likes = fields.List(fields.Nested(PostLikeSchema))
