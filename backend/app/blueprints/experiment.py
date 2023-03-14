
from flask import Blueprint, request, jsonify
from app.db import cursor
import json

from app.db import lastrowid

bp = Blueprint("experiment", __name__, url_prefix="/experiment")

# Configure test path


@bp.route('/', methods=["POST"])
def set_experiment():
    data = request.json

    insert = dict(
        started=data["started"],
        subject_id=data["subject_id"],
        device_id=data["device_id"],
        session_type=data["session_type"],

        subject_age=data["subject_age"],
        subject_sex=data["subject_sex"],
        subject_netflix_familiarity=data["subject_netflix_familiarity"],
        subject_selected_content=data["subject_selected_content"],
        content_continuation=data["content_continuation"],

        settings=data["settings"],
        urls=data["urls"]
    )
    # Create experiment
    cursor().execute(f"""INSERT INTO experiment (started, subject_id, device_id, session_type, 
    subject_age, subject_sex, subject_netflix_familiarity, subject_selected_content, content_continuation,
    settings, urls) 
    VALUES (:started, :subject_id, :device_id, :session_type,
    :subject_age, :subject_sex, :subject_netflix_familiarity, :subject_selected_content, :content_continuation,
    :settings, :urls)""", insert)

    experiment_id = lastrowid()
    return jsonify(dict(experiment_id=experiment_id)), 201
    


@bp.route("/", methods=["PATCH"])
def update_experiment():
    insert = dict(
        experiment_id=request.json["experiment_id"],
        ended=request.json["ended"]
    )
    cursor().execute(
        f"UPDATE experiment SET ended=:ended WHERE id=:experiment_id", insert)

    return jsonify(dict(msg="experiment end time updated")), 201




@bp.route("/", methods=["GET"])
def get_experiment():
    return {"msg": "OK EXPERIMENT GET"}, 200
