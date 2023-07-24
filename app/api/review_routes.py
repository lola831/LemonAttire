from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET USER REVIEWS
@review_routes.route('/current')
@login_required
def user_reviews():
    """
    Query for all user's reviews
    """
    reviews = Review.query.filter_by(user_id=current_user.id)
    return {'reviews': [review.to_dict() for review in reviews]}

# DELETE A REVIEW
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({'error': 'Review not found'}), 404
    if current_user.id is not review.user_id:
        return jsonify({'error': 'You are not authorized to delete this review'}), 400
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Your review has been deleted.'}
