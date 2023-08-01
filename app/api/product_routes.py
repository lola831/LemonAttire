from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, Review, Favorite, db
from app.forms import ReviewForm
from app.forms import FavoriteForm

product_routes = Blueprint('product_types/<int:product_types_id>/products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL OF PRODUCTS OF PRODUCT TYPE
@product_routes.route('/')
def all_products(product_type_id):
    print("IN PRODUCTS ROUTE--------------------------------------------")
    """
    Query for all products and returns them in a list of product dictionaries
    """
    products = Product.query.filter_by(product_type_id=product_type_id)
    return {'products': [product.to_dict() for product in products]}


# GET ALL REVIEWS BY PRODUCT ID
@product_routes.route('/<int:product_id>/reviews')
def product_reviews(product_type_id, product_id):
    if Product.query.get(product_id) is None:
         return jsonify({'error': 'Product not found'}), 404
    reviews = Review.query.filter_by(product_id=product_id)
    return {'reviews': [review.to_dict() for review in reviews]}

# CREATE A REVIEW BASED ON PRODUCT ID
@product_routes.route('/<int:product_id>/reviews', methods=['POST'])
@login_required
def create_review(product_type_id, product_id):
    """
    Creates a new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id= current_user.id,
            product_id= product_id,
            description=form.data['description'],
            rating=form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# GET ALL FAVS BY PRODUCT ID
@product_routes.route('/<int:product_id>/favorites')
def product_favs(product_type_id, product_id):
    if Product.query.get(product_id) is None:
         return jsonify({'error': 'Product not found'}), 404
    favs = Favorite.query.filter_by(product_id=product_id)
    # if favs in None:
    #     return {'message': 'There are no favs'}
    return {'favorites': [fav.to_dict() for fav in favs]}

# CREATE A FAV BASED ON PRODUCT ID
@product_routes.route('/<int:product_id>/favorites', methods=['POST'])
@login_required
def create_fav(product_type_id, product_id):
    print("==============================================================>")
    print("PRODUCTTTTT TYPPPPPEEEEEE IDDDDDD", product_type_id)
    print("PRODUCT IDDDDDDDDDDDDD", product_id)
    image = request.get_json()
    print("IMAAAAGEEEEEEEE", image)
    """
    Creates a new favorite
    """
    # form = FavoriteForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     fav = Favorite(user_id=form['userId'].data,
    #                       product_id=form['productId'].data)
    #     db.session.add(fav)
    #     db.session.commit()
    #     return fav.to_dict()
    # else:
    #     return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    print("user id: ", current_user.id)
    fav = Favorite(
        user_id=current_user.id,
        product_id=product_id,
        product_type_id=product_type_id,
        image=image['image'],
    )
    db.session.add(fav)
    db.session.commit()
    return fav.to_dict()
