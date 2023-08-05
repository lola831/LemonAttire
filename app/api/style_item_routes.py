from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import StyleItem, Style, db
from app.forms import StyleItemForm
from datetime import datetime
from sqlalchemy.orm import selectinload

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
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404

    style_items = StyleItem.query.filter_by(style_id=style_id)
    return {'style_items': [style_item.to_dict() for style_item in style_items]}

# ADD ITEM TO STYLE
@style_item_routes.route('/', methods=['POST'])
@login_required
def add_style_item(style_id):
    """
    Creates a new style item
    """
    print("-----------------------add style item")
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404

     #CHECK IF ITEM ALREADY EXISTS IN STYLE
    styleitems = style.style_items

    style_item_id = request.get_json()

    for item in styleitems:
        if item.product_type_id == style_item_id:
            print("heeereee#########################")
            return jsonify({'error': 'This item is already saved in your style'})

    print("okkkk")


    # form = StyleItemForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     print("IN FORM VALIDATE")

    #     #CHECK IF ITEM ALREADY EXISTS IN STYLE
    #     styleitems = style.style_items
    #     print("style items:  ", styleitems)
    #     print("check for product type: ", form.data['product_type_id'])
    #     for item in styleitems:
    #         if item.product_type_id == form.data['product_type_id']:
    #             print("heeereee#########################")
    #             return jsonify({'error': 'This item is already saved in your style'}), 403

    #     print("OKKKKK")
    #     style_item = StyleItem(
    #         style_id = style_id,
    #         product_type_id = form.data['product_type_id']
    #     )
    style_item = StyleItem(
        style_id = style_id,
        product_type_id = style_item_id
    )
    print("stle id: ", style_item.style_id)
    print("prod type id: ", style_item.product_type_id)

    db.session.add(style_item)
    db.session.commit()
    return style_item.to_dict()
    print("ERROR BACKEND:   ")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE A STYLE ITEM
@style_item_routes.route('/<int:style_item_id>', methods=['DELETE'])
@login_required
def delete_style_item(style_id, style_item_id):

    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404

    style_item = StyleItem.query.get(style_item_id)
    if style_item is None:
        return jsonify({'error': 'Style item not found'}), 404
    db.session.delete(style_item)
    db.session.commit()
    return {'message': 'Item has been removed from your style.'}
# NEED TO ADD ERROR CHECK IF ITEM IS IN SPECIFIC STYLE
