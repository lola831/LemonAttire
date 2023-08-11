from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def validate_email(form, field):
    email = field.data
    at = email.rfind('@')
    print("ATTTTTTTTTT: ", at)
    if at == -1:
        raise ValidationError('Invalid email.')
    dot = email[at:]
    print("REST OF EMAIL", dot)
    if dot.rfind(".") == -1:
        raise ValidationError('Invalid email.')



def user_exists(form, field):
    # Checking if user exists
    print("IN SIGNUP FORM BACKEND: ", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired(), Length(max=50)])
    lastName = StringField('lastName', validators=[DataRequired(), Length(max=50)])
    email = StringField('email', validators=[DataRequired(), validate_email, user_exists, Length(max=50)])
    password = StringField('password', validators=[DataRequired(), Length(max=10)])
