import json
from random import randint
from .utils import headers


def test_keyboard_event(client):

    data = dict(
        subject_id="test_subject_id_GABAGOOOL",
        code="KeyF",
        key="f",
        alt_key=False,
        ctrl_key=False,
        shift_key=False,
        key_code=70,
        repeat=False,
        type="keyup",
        which=70,
        timestamp="2022-06-27T15:37:43.733"
    )

    # This works fine, just like the javascript object
    res = client.post("/keyboard_event/", data=json.dumps(data), headers=headers)
    print(json.loads(res.data))
    assert res.status_code == 201
