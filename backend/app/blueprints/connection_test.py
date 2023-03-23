from flask import Blueprint, request, jsonify


bp = Blueprint("connection_test", __name__, url_prefix="/connection_test")

@bp.route('/', methods=["GET"])
def connection_test():
    return {"msg": "OK"}, 200