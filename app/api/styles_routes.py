from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Style, db
from app.forms import StyleForm
from datetime import datetime

style_routes = Blueprint('styles', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field: error})
    return errorMessages

# GET ALL STYLES
@style_routes.route('/')
def all_styles():
    """
    Query for all styles and returns them in a list of style dictionaries
    """
    styles = Style.query.all()
    return {'styles': [style.to_dict() for style in styles]}

# GET ALL USER'S STYLES
@style_routes.route('/current')
@login_required
def user_styles():
    """
    Query for all styles by user id and returns them in a list of style dictionaries ordered by most recent first
    """
    styles = Style.query.filter_by(user_id=current_user.id).order_by(Style.created_at) #.desc() ????
   
    return {'user_styles': [style.to_dict() for style in styles]}

# GET STYLE BY STYLE ID:
@style_routes.route('/current/<int:style_id>')
@login_required
def user_style(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404
    if current_user.id is not style.user_id:
        return jsonify({'error': 'You are not authorized to edit this post'}), 400
    return style.to_dict()

# CREATE NEW STYLE
@style_routes.route('/', methods=['POST'])
@login_required
def create_style():
    print("IN BACKEND ======================")
    """
    Creates a new style
    """
    form = StyleForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("IN FORM VAL: ", form.data)
        style = Style(
            title=form.data['title'],
            user_id=current_user.id
        )
        db.session.add(style)
        db.session.commit()
        return style.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# EDITS A STYLE
@style_routes.route('/<int:style_id>', methods=['PUT'])
@login_required
def edit_style(style_id):
    """
    Edits a style
    """
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404
    if current_user.id is not style.user_id:
        return jsonify({'error': 'You are not authorized to edit this style'}), 400

    form = StyleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(style)
        style.updated_at = datetime.utcnow()
        db.session.commit()
        return style.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE A STYLE
@style_routes.route('/<int:style_id>', methods=['DELETE'])
@login_required
def delete_style(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404
    if current_user.id is not style.user_id:
        return jsonify({'error': 'You are not authorized to edit this style'}), 400
    db.session.delete(style)
    db.session.commit()
    return {'message': 'Your style has been deleted.'}
