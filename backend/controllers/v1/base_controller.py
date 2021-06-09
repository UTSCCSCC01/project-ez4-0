from flask_restful import Resource
from flask_apispec import marshal_with
from schemas import ErrorResponseSchema
from flask_apispec.views import MethodResourceMeta


@marshal_with(ErrorResponseSchema, code=404)
@marshal_with(ErrorResponseSchema, code=403)
@marshal_with(ErrorResponseSchema, code=401)
@marshal_with(ErrorResponseSchema, code=400)
class BaseController(Resource, metaclass=MethodResourceMeta):
    """
    BaseController handles error code 404, 403, 401, 400
    and the return schema will contain a description to
    tell the failure reason.
    """
    pass
