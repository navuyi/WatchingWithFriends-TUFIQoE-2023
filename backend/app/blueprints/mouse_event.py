from calendar import c
from flask import Blueprint, request, jsonify
from app.db import cursor
import json

from app.db import lastrowid

bp = Blueprint("mouse_event", __name__, url_prefix="/mouse_event")

# Configure test path


@bp.route('/', methods=["POST"])
def create_mouse_event():
    data = request.json

    insert = dict(
        subject_id=data["subject_id"],
        target_class_name=data["target_class_name"],
        target_class_list=data["target_class_list"],
        target_id=data["target_id"],
        target_inner_text=data["target_inner_text"],
        target_node_name=data["target_node_name"],
        type=data["type"],
        path=data["path"],
        which=data["which"],
        timestamp=data["timestamp"],
        clientX=data["clientX"],
        clientY=data["clientY"],
        offsetX=data["offsetX"],
        offsetY=data["offsetY"],
        pageX=data["pageX"],
        pageY=data["pageY"],
        screenX=data["screenX"],
        screenY=data["screenY"]
    )
    cursor().execute(f"""INSERT INTO mouse_event (
        subject_id,target_class_name, target_class_list, target_id, target_inner_text,
        target_node_name, type, path, which, timestamp,
        clientX, clientY, offsetX, offsetY,
        pageX, pageY, screenX, screenY) VALUES 
        (:subject_id, :target_class_name, :target_class_list, 
        :target_id, :target_inner_text,
        :target_node_name, :type, :path, :which, :timestamp, :clientX, :clientY, 
        :offsetX, :offsetY, :pageX, :pageY, :screenX, :screenY)""", insert)

    return jsonify(dict(msg="Mouse event created")), 201
