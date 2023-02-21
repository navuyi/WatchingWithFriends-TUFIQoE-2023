import json
from random import randint
from .utils import headers


def test_mouse_event(client):

    data = dict(
        subject_id="test_subject_id_GABAGOOOL",
        target_class_name="ytp-button ytp-settings-button",
        target_class_list="""{"0": "ytp-button", "1": "ytp-settings-button"}""",
        target_id="",
        target_inner_text="INNER TEXT INNER TEXT",
        target_node_name="BUTTON",
        type="mousedown",
        path="PAAATH VERY LONG JSON STRING AAAAA",
        which=1,
        timestamp="2022-06-27T14:02:11.179",
        clientX=randint(1, 10000),
        clientY=randint(1, 10000),
        offsetX=randint(1, 10000),
        offsetY=randint(1, 10000),
        pageX=randint(1, 10000),
        pageY=randint(1, 10000),
        screenX=randint(1, 10000),
        screenY=randint(1, 10000)
    )

    # This works fine, just like the javascript object
    res = client.post("/mouse_event/", data=json.dumps(data), headers=headers)
    print(json.loads(res.data))
    assert res.status_code == 201
