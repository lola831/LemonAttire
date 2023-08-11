from app.models import db, StyleItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_style_items():
    style_item1 = StyleItem(
        style_id=1, product_type_id=1)
    style_item2 = StyleItem(
        style_id=1, product_type_id=2)
    style_item3 = StyleItem(
        style_id=1, product_type_id=3)
    style_item4 = StyleItem(
        style_id=1, product_type_id=4)
    style_item5 = StyleItem(
        style_id=2, product_type_id=1)
    style_item6 = StyleItem(
        style_id=2, product_type_id=2)


    db.session.add(style_item1)
    db.session.add(style_item2)
    db.session.add(style_item3)
    db.session.add(style_item4)
    db.session.add(style_item5)
    db.session.add(style_item6)



    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_style_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.style_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM style_items"))

    db.session.commit()
