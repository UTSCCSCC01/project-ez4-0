"""
This controller handles the following APIs:
- GET /api/v1/videos/:id
- GET /api/v1/videos
"""
from flask_apispec import doc, marshal_with
from schemas import (
    VideoSchema,
    GetVideosSchema,
)
from .base_controller import BaseController
from models import Video


@doc(tags=["Video"])
class VideoController(BaseController):
    @doc(description="Get a video by ID")
    @marshal_with(VideoSchema, code=200)
    def get(self, video_id, **_):
        video = Video.query.filter_by(id=video_id).first()
        if video:
            return video
        return {"description": "Video not found"}, 404


@doc(tags=["Video"])
class VideosController(BaseController):
    @doc(description="Get all available videos")
    @marshal_with(GetVideosSchema)
    def get(self, **_):
        return {"videos": Video.query.all()}
