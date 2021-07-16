from marshmallow import Schema, fields


class VideoSchema(Schema):
    id = fields.UUID(description="Video ID")
    name = fields.Str(description="video name")
    description = fields.Str(description="Description of the video")
    url = fields.Str(description="URL of the video")
    course_id = fields.Str(description="Related course ID")


class GetVideosSchema(Schema):
    videos = fields.List(
        fields.Nested(VideoSchema),
        description="A list of videos"
    )
