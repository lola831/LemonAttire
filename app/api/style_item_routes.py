from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import StyleItem, Style, db
from app.forms import StyleItemForm
from datetime import datetime

style_item_routes = Blueprint('styles/<int:style_id>/style_items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL ITEMS IN A STYLE
@style_item_routes.route('/')
def all_style_items(style_id):
    """
    Query for all style items and returns them in a list of style item dictionaries
    """
    style_items = StyleItem.query.filter_by(style_id=style_id)
    return {'style_items': [style_item.to_dict() for style_item in style_items]}

# ADD ITEM TO STYLE
@style_item_routes.route('/', methods=['POST'])
@login_required
def add_style_item(style_id):
    """
    Creates a new style item
    """
    form = StyleItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # style_item_exists = Style.query.get(style_id).join(Style.style_items).filter(Style.style_items.product_id==form.data['product_id'])

        # if style_item_exists:
        #     return jsonify({'error': 'This item is already saved in your style'}), 403
        style_item = StyleItem(
            style_id = style_id,
            product_id = form.data['product_id']
        )
        db.session.add(style_item)
        db.session.commit()
        return style_item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE A STYLE ITEM
@style_item_routes.route('/<int:style_item_id>', methods=['DELETE'])
@login_required
def delete_style_item(style_id, style_item_id):
    style_item = StyleItem.query.get(style_item_id)
    if style_item is None:
        return jsonify({'error': 'Style item not found'}), 404
    db.session.delete(style_item)
    db.session.commit()
    return {'message': 'Item has been removed from your style.'}
# NEED TO ADD ERROR CHECK IF ITEM IS IN SPECIFIC STYLE
