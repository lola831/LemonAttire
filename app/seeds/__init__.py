from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .favorites import seed_favorites, undo_favorites
from .order_items import seed_order_items, undo_order_items
from .orders import seed_orders, undo_orders
from .product_types import seed_product_types, undo_product_types
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .style_items import seed_style_items, undo_style_items
from .styles import seed_styles, undo_styles

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_style_items()
        undo_styles()
        undo_reviews()
        undo_favorites()
        undo_order_items()
        undo_orders()
        undo_products()
        undo_product_types()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_product_types()
    seed_products()
    seed_orders()
    seed_order_items()
    seed_favorites()
    seed_reviews()
    seed_styles()
    seed_style_items()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_style_items()
    undo_styles()
    undo_reviews()
    undo_favorites()
    undo_order_items()
    undo_orders()
    undo_products()
    undo_product_types()
    undo_categories()
    undo_users()
