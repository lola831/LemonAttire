from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Order, db
from app.forms import OrderForm
# from app.api import validation_errors_to_error_messages #need init file in api??

order_routes = Blueprint('orders', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL ORDERS
@order_routes.route('/')
def orders():
    """
    Query for all orders and returns them in a list of order dictionaries
    """
    orders = Order.query.all()
    return {'orders': [order.to_dict() for order in orders]}

# GET USER'S LAST ORDER
@order_routes.route('/current/last')
@login_required
def last_order():
    """
    Query for user's last order and returns that order in a dictionary
    """
    # curr_user_id = current_user.id
    order = Order.query.filter_by(user_id=current_user.id).first()
    return order.to_dict()

# GET ALL USER'S ORDERS
@order_routes.route('/current')
@login_required
def order():
    """
    Query for all orders by user id and returns them in a list of order dictionaries ordered by most recent first
    """
    orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at) #.desc() ????
    return {'user_orders': [order.to_dict() for order in orders]}

# CREATE NEW ORDER
@order_routes.route('/', methods=['POST'])
@login_required
def create_order():
    """
    Creates a new order
    """
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order(
            status=form.data['status'],
            total_price=form.data['total_price'],
            user_id=current_user.id
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
