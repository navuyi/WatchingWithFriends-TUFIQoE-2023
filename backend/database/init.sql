/*DROP TABLES*/
DROP TABLE IF EXISTS mouse_event;
DROP TABLE IF EXISTS keyboard_event;


CREATE TABLE IF NOT EXISTS mouse_event(
    id INTEGER NOT NULL PRIMARY KEY,
    subject_id TEXT NOT NULL,
    target_class_name TEXT,
    target_class_list TEXT,
    target_id TEXT,
    target_inner_text TEXT,
    target_node_name TEXT,

    type TEXT,
    path TEXT,
    which INTEGER,
    timestamp TEXT,

    clientX INTEGER,
    clientY INTEGER,
    offsetX INTEGER, 
    offsetY INTEGER,
    pageX INTEGER, 
    pageY INTEGER,
    screenX INTEGER,
    screenY INTEGER
);


CREATE TABLE IF NOT EXISTS keyboard_event(
    id INTEGER NOT NULL PRIMARY KEY,
    subject_id TEXT NOT NULL,
    code TEXT,
    key TEXT,
    alt_key INTEGER,
    ctrl_key INTEGER,
    shift_key INTEGER,
    repeat INTEGER,
    key_code INTEGER,
    type TEXT,
    which INTEGER,
    timestamp TEXT
);
