# Flask
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# Database
import mongoengine
# Config and logging
import logging
import config as c
# APIs
from flask_apispec import FlaskApiSpec
from flask_restful import Api
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin


logger = logging.Logger(logging.INFO)
db = SQLAlchemy(session_options={'expire_on_commit': False})


def create_app(test=False):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(c)

    # cors
    CORS(
        app, expose_headers=["Authorization"], resources={"/*": {"origins": c.ORIGINS}}
    )

    # Test endpoint, remove later
    @app.route("/")
    def test():
        return jsonify({"success": True})

    # Return validation errors as JSON
    @app.errorhandler(422)
    def handle_error(err):
        headers = err.data.get("headers", None)
        messages = err.data.get("messages", ["Invalid request."])
        logger.warn(messages)
        if headers:
            return jsonify({"errors": messages}), err.code, headers
        else:
            return jsonify({"errors": messages}), err.code

    @app.errorhandler(404)
    def handle_404(err):
        return jsonify({"description": "Not Found"}), err.code

    register_extensions(app)
    register_blueprints(app)

    return app


def register_blueprints(app):
    """Blueprints(APIs) registrations"""
    from controllers.v1 import (
        user_bp,
        set_user_routes,
        auth_bp,
        set_auth_routes,
        post_bp,
        set_post_routes,
        job_post_bp,
        set_job_post_routes,
    )

    APISPEC_SPEC = APISpec(
        title="EntreE API",
        version="v1",
        plugins=[MarshmallowPlugin()],
        produces=["application/json"],
        openapi_version="2.0.0",
        tags=[
            {
                "name": "User"
            }
        ],
    )
    app.config.update({"APISPEC_SPEC": APISPEC_SPEC})
    docs = FlaskApiSpec(app)

    # User API
    user_api = Api(user_bp)
    app.register_blueprint(user_bp)
    set_user_routes(user_api, docs)

    # Auth API
    auth_api = Api(auth_bp)
    app.register_blueprint(auth_bp)
    set_auth_routes(auth_api, docs)

    # Post API
    post_api = Api(post_bp)
    app.register_blueprint(post_bp)
    set_post_routes(post_api, docs)

    # Job Post API
    job_post_api = Api(job_post_bp)
    app.register_blueprint(job_post_bp)
    set_job_post_routes(job_post_api, docs)


def register_extensions(app):
    """Extensions(Databases) registrations"""
    # Import models from Flask Migrate
    from models import User

    # PostgreSQL
    db.init_app(app)
    # Migrations
    Migrate(app, db)

    # MongoDB
    mongoengine.connect(
        c.MONGO_DB,
        host=c.MONGODB_URL,
        connect=False,
        tz_aware=True,
        maxidletimems=c.MONGODB_MAX_IDLE_TIME_MS
    )
    mongoengine.connection.get_db()
