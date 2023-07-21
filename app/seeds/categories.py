from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    tops = Category(name='Tops')
    activewear = Category(name='Activewear')
    bags = Category(name='Bags')
    pants = Category(name='Pants')
    dresses = Category(name='Dresses')
    hats = Category(name='Hats')
    jackets = Category(name='Jackets')
    shorts = Category(name='Shorts')
    skirts = Category(name='Skirts')
    sweaters = Category(name='Sweaters')
    shoes = Category(name='Shoes')



    db.session.add(tops)
    db.session.add(activewear)
    db.session.add(bags)
    db.session.add(pants)
    db.session.add(dresses)
    db.session.add(hats)
    db.session.add(jackets)
    db.session.add(shorts)
    db.session.add(skirts)
    db.session.add(sweaters)
    db.session.add(shoes)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
