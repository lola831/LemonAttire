from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import OrderItem, db
from app.forms import OrderItemForm
from datetime import datetime

order_item_routes = Blueprint('orders/<int:order_id>/order_items', __name__)

# order_id = request.args.get('order_id')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL OF AN ORDER'S ORDER_ITEMS
@order_item_routes.route('/')
def all_order_items(order_id):
    """
    Query for all order items and returns them in a list of order item dictionaries
    """
    # order_id = request.args.get('order_id') ?????????????????
    order_items = OrderItem.query.filter_by(order_id=order_id)
    return {'order_items': [order_item.to_dict() for order_item in order_items]}

# ADD ITEM TO ORDER
@order_item_routes.route('/', methods=['POST'])
@login_required
def add_order_item(order_id):
    """
    Creates a new order item
    """
    form = OrderItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        order_item = OrderItem(
            order_id = order_id,
            product_id = form.data['product_id'],
            product_type_id=form.data['product_type_id'],
            price = form.data['price'],
            quantity=form.data['quantity'],
            total_price = form.data['total_price'],
            color = form.data['color'],
            size = form.data['size'],
            image = form.data['image'],
            name = form.data['name']
        )
        db.session.add(order_item)
        db.session.commit()
        return order_item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# EDITS AN ORDER ITEM
@order_item_routes.route('/<int:order_item_id>', methods=['PUT'])
@login_required
def edit_order_item(order_id, order_item_id):
    """
    Edits an order item
    """
    order_item = OrderItem.query.get(order_item_id)

    if order_item is None:
        return jsonify({'error': 'Order item not found'}), 404

    data = request.get_json()
    quantity = data["quantity"]
    total_price = data["total_price"]
    order_item.quantity = quantity
    order_item.total_price = total_price
    db.session.commit()
    return order_item.to_dict()

# DELETE AN ORDER ITEM
@order_item_routes.route('/<int:order_item_id>', methods=['DELETE'])
@login_required
def delete_order_item(order_id, order_item_id):
    order_item = OrderItem.query.get(order_item_id)
    if order_item is None:
        return jsonify({'error': 'Order item not found'}), 404
    db.session.delete(order_item)
    db.session.commit()
    return {'message': 'Your item has been removed from your order.'}
