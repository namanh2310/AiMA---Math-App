from flask import Blueprint

from forumController.services.AuthController import AuthController

Auth = Blueprint("Auth", __name__)

Auth.route("/register", methods=["POST"])(AuthController.Register)
Auth.route("/login", methods=["POST"])(AuthController.Login)

