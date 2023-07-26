from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import ProductType, Review, Favorite, db

product_type_routes = Blueprint('product_types', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL PRODUCT TYPES
@product_type_routes.route('/')
def all_product_types():
    """
    Query for all product types (results can be filtered by type)
    """
    category = request.args.get('category')

    query = ProductType.query

    if category:
        query = query.filter(ProductType.category == category)

    product_types = [product.to_dict() for product in query.all()]

    return jsonify({"products": product_types}), 200

# GET PRODUCT TYPE BY ID:
@product_type_routes.route('/<int:product_type_id>')
def product_type(product_type_id):
    product_type = ProductType.query.get(product_type_id)

    if product_type is None:
        return jsonify({'error': 'Product not found'}), 404

    return jsonify({'productType': product_type.to_dict()}), 200
