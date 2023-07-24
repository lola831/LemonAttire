from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import ProductType, Review, Favorite, db
from app.forms import ReviewForm

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
    print("im here------------------------------")
    """
    Query for all product types
    """
    product_types = ProductType.query.all()
    print("here=============================",type(product_types))
    return {'product_types': [product_type.to_dict() for product_type in product_types]}
    # return [product_type.to_dict() for product_type in product_types]

# GET ALL REVIEWS BY PRODUCT TYPE ID
@product_type_routes.route('/<int:product_type_id>/reviews')
def product_type_reviews(product_type_id):
    if ProductType.query.get(product_type_id) is None:
         return jsonify({'error': 'Product type not found'}), 404
    reviews = Review.query.filter_by(product_type_id=product_type_id)
    return {'reviews': [review.to_dict() for review in reviews]}

# CREATE A REVIEW BASED ON PRODUCT TYPE ID
@product_type_routes.route('/<int:product_type_id>/reviews', methods=['POST'])
@login_required
def create_review(product_type_id):
    """
    Creates a new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id= current_user.id,
            product_type_id= product_type_id,
            description=form.data['description'],
            rating=form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# GET ALL FAVS BY PRODUCT TYPE ID
@product_type_routes.route('/<int:product_type_id>/favorites')
def product_type_favs(product_type_id):
    if ProductType.query.get(product_type_id) is None:
         return jsonify({'error': 'Product type not found'}), 404
    favs = Favorite.query.filter_by(product_type_id=product_type_id)
    # if favs in None:
    #     return {'message': 'There are no favs'}
    return {'favorites': [fav.to_dict() for fav in favs]}

# CREATE A FAV BASED ON PRODUCT TYPE ID
@product_type_routes.route('/<int:product_type_id>/favorites', methods=['POST'])
@login_required
def create_fav(product_type_id):
    """
    Creates a new favorite
    """
    fav = Favorite(
        user_id= current_user.id,
        product_type_id= product_type_id,
    )
    db.session.add(fav)
    db.session.commit()
    return fav.to_dict()
