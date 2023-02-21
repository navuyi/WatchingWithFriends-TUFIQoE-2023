from flask import Blueprint

from . test_B import bp as test_B_bp
from . test_A import bp as test_A_bp


from . mouse_event import bp as bp_mouse_event
from . keyboard_event import bp as bp_keyboard_event

bp = Blueprint('bp', __name__)


bp.register_blueprint(bp_mouse_event)
bp.register_blueprint(bp_keyboard_event)

bp.register_blueprint(test_A_bp)
bp.register_blueprint(test_B_bp)
