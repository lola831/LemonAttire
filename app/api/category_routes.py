from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Category, db

category_routes = Blueprint('categories', __name__)

# GET ALL CATEGORIES
@category_routes.route('/')
def all_categories():
    """
    Query for all categories
    """
    categories = Category.query.all()
    return {'categories': [category.to_dict_name() for category in categories]}
