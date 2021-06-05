from flask import Flask, json, jsonify
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import mongoengine

import logging

import config as c


logger = logging.Logger(logging.INFO)
db = SQLAlchemy()


def create_app():
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
    pass


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
