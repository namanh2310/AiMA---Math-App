from flask import Blueprint

from calController.AIController import AIController

AIScan = Blueprint("AIScan", __name__)

AIScan.route("/AIScanforWeb", methods=["POST"])(AIController.AIforWeb)
AIScan.route("/AIforApp", methods=["POST"])(AIController.AIforApp)