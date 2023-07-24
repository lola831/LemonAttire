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
    Query for all product types
    """
    product_types = ProductType.query.all()
    print("here=============================", product_types)
    return {'product_types': [product_type.to_dict() for product_type in product_types]}
    # return [product_type.to_dict() for product_type in product_types]
