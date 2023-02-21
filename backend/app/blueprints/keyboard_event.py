from calendar import c
from flask import Blueprint, request, jsonify
from app.db import cursor
import json

from app.db import lastrowid

bp = Blueprint("keyboard_event", __name__, url_prefix="/keyboard_event")

# Configure test path


@bp.route('/', methods=["POST"])
def create_keyboard_event():
    data = request.json

    insert = dict(
        subject_id=data["subject_id"],
        code=data["code"],
        key=data["key"],
        alt_key=data["alt_key"],
        ctrl_key=data["ctrl_key"],
        shift_key=data["shift_key"],
        key_code=data["key_code"],
        repeat=data["repeat"],
        type=data["type"],
        which=data["which"],
        timestamp=data["timestamp"]
    )
    cursor().execute(f"""INSERT INTO keyboard_event (
       subject_id, code, key, alt_key, ctrl_key, shift_key, key_code, repeat, type, which, timestamp) VALUES 
        (:subject_id, :code, :key, :alt_key, :ctrl_key, :shift_key, :key_code, :repeat, :type, :which, :timestamp)""", insert)

    return jsonify(dict(msg="Keyboard event created")), 201
