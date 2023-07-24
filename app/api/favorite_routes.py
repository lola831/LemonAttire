from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Favorite, db

favorite_routes = Blueprint('favorites', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET USER FAVORITES
@favorite_routes.route('/current')
@login_required
def user_favs():
    """
    Query for all user's favorites
    """
    favorites = Favorite.query.filter_by(user_id=current_user.id)
    return {'favorites': [fav.to_dict() for fav in favorites]}

# DELETE A FAVORITE
@favorite_routes.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_fav(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite is None:
        return jsonify({'error': 'Favorite not found'}), 404
    if current_user.id is not favorite.user_id:
        return jsonify({'error': 'You are not authorized to delete this fav'}), 400
    db.session.delete(favorite)
    db.session.commit()
    return {'message': 'Your favorite has been deleted.'}
