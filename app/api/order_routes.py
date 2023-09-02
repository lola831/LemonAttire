from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Order, db
from app.forms import OrderForm
from datetime import datetime
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
def all_orders():
    """
    Query for all orders and returns them in a list of order dictionaries
    """
    orders = Order.query.all()
    return {'orders': [order.to_dict() for order in orders]}

# GET USER'S CURRENT ORDER
@order_routes.route('/current/pending')
@login_required
def current_order():
    """
    Query for user's current order and returns that order in a dictionary
    """
    # curr_user_id = current_user.id
    order = Order.query.filter_by(user_id=current_user.id, status="pending").first()
    if order is None:
        return {}
    else:
        return order.to_dict()

# GET ALL USER'S ORDERS
@order_routes.route('/current')
@login_required
def user_orders():
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
    print("WHATTTTTTTTTTT---------------------------------------------------")
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order(
            status=form.data['status'],
            # total_price=0.00,
            user_id=current_user.id
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#PLACE ORDER
@order_routes.route('/<int:order_id>/shipping', methods=['PUT'])
@login_required
def place_order(order_id):
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

    order = Order.query.get(order_id)

    if order is None:
        return jsonify({'error': 'Order not found'}), 404
    if current_user.id is not order.user_id:
        return jsonify({'error': 'You are not authorized to place this Order'}), 400

    order.status = "paid"
    db.session.commit()

    return order_id

# EDITS AN ORDER
@order_routes.route('/<int:order_id>', methods=['PUT'])
@login_required
def edit_order(order_id):
    """
    Edits an order
    """
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({'error': 'Order not found'}), 404
    if current_user.id is not order.user_id:
        return jsonify({'error': 'You are not authorized to edit this Order'}), 400

    data = request.get_json()
    print("*********************************************", data)


    if 'delete' in data.keys():
        print("DELETE--------------------------------")
        order.price -= data["delete"]
        order.tax = (order.price * 7.25) / 100
        order.total_price = order.price + order.tax
        db.session.commit()
        return order.to_dict()

    if 'add' in data.keys():
        print("ADD------------------------", data["add"])
        order.price += data["add"]
        order.tax = (order.price * 7.25) / 100
        order.total_price = order.price + order.tax
        db.session.commit()
        return order.to_dict()

    if 'minus' in data.keys():
        print("MINUS------------------------", data["minus"])
        order.price -= data["minus"]
        order.tax = (order.price * 7.25) / 100
        order.total_price = order.price + order.tax
        db.session.commit()
        return order.to_dict()

    if order.price is None:
        order.price = data["total_price"]
        order.tax = (order.price * 7.25) / 100
        order.total_price = order.price + order.tax
    else:
        order.price += data["total_price"]
        order.tax = (order.price * 7.25) / 100
        order.total_price = order.price + order.tax


    db.session.commit()
    return order.to_dict()



# DELETE AN ORDER
@order_routes.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({'error': 'Order not found'}), 404
    if current_user.id is not order.user_id:
        return jsonify({'error': 'You are not authorized to edit this post'}), 400
    db.session.delete(order)
    db.session.commit()
    return {'message': 'Your order has been cancelled.'}
