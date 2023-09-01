from app.models import db, ProductType, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_types():
    product_type1 = ProductType(
        name="Jay Ribbed Crop Top",
        description="Bring it back to the basics with the Jake Pink Ribbed Knit Crop Top. This halter tank top features ribbed material, a racerback, and high neck design that will make it your go-to basic top for everyday wear. Pair with denim jeans or shorts for a casual day out, or wear with a mini skirt for more elevated occasions.",
        category="Tops",
        price=24.00)
    product_type2 = ProductType(
        name="Charlie Ribbed Crop Top",
        description="Wardrobe essential alert! You'll love the Eagerly Anticipate Hunter Green Ribbed Cropped Top. This surplice top long sleeve is a key piece for your colder weather wardrobe. With a long sleeve and fitted crop top silhouette, this top is perfect for layering. The deep v neckline and ribbed fabric give this top a little extra something special. Add this fitted crop top to your wardrobe today!",
        category="Tops",
        price=25.00)
    product_type3 = ProductType(
        name="Abby Maxi Dress",
        description="Feelin' fancy? Add the Abegayle Maxi Dress to the front of your formal dress collection. This Taupe plunging maxi dress will transform any babe into a goddess. Whether it's prom, a wedding, or any other formal event, the lace trim and criss cross back on this maxi dress will stun. Watch this dress turn some heads.",
        category="Dresses",
        price=59.00)
    product_type4 = ProductType(
        name="Belted Cropped Pants",
        category="Pants",
        price=49.00)
    product_type5 = ProductType(
        name="Satin Slit Mini Dress",
        category="Dresses",
        price=44.00)
    product_type6 = ProductType(
        name="Glam Strapless Maxi Dress",
        category="Dresses",
        price=69.00)
    product_type7 = ProductType(
        name="Floral Keyhole Midi Dress",
        category="Dresses",
        price=49.00)
    product_type8 = ProductType(
        name="Blue Floral Mini Dress",
        category="Dresses",
        price=44.00)
    product_type9 = ProductType(
        name="Multi Floral Mini Dress",
        category="Dresses",
        price=31.00)
    product_type10 = ProductType(
        name="Sherbert Cutout Maxi Dress",
        category="Dresses",
        price=54.00)
    product_type11 = ProductType(
        name="Daisy Flutter Sleeve Dress",
        category="Dresses",
        price=48.00)
    product_type12 = ProductType(
        name="Valencia Lace Maxi Dress",
        category="Dresses",
        price=59.00)
    product_type13 = ProductType(
        name="Daniela Mini Dress",
        category="Dresses",
        price=48.00)
    product_type14 = ProductType(
        name="Satin Ruched Dress",
        category="Dresses",
        price=50.00)
    product_type15 = ProductType(
        name="Flower BodyCon Dress",
        category="Dresses",
        price=44.00)
    product_type16 = ProductType(
        name="Green Plaid Dress",
        category="Dresses",
        price=37.00)
    product_type17 = ProductType(
        name="Lace Black Cami Top",
        category="Tops",
        price=27.00)
    product_type18 = ProductType(
        name="Layla Bodysuit Top",
        category="Tops",
        price=39.00)
    product_type19 = ProductType(
        name="Ivory Halter Top",
        category="Tops",
        price=32.00)
    product_type20 = ProductType(
        name="Mint Ditsy Floral Top",
        category="Tops",
        price=35.00)
    product_type21 = ProductType(
        name="Lala Taupe Top",
        category="Tops",
        price=31.00)
    product_type22 = ProductType(
        name="Macie Blouse Top",
        category="Tops",
        price=30.00)
    product_type23 = ProductType(
        name="Stitch Crop Top",
        category="Tops",
        price=38.00)
    product_type24 = ProductType(
        name="Cream Wide Leg Pants",
        category="Pants",
        price=64.00)
    product_type25 = ProductType(
        name="White Stripe Pants",
        category="Pants",
        price=52.00)
    product_type26 = ProductType(
        name="Homebody Sweatpants",
        category="Activewear",
        price=49.00
    )
    product_type27 = ProductType(
        name="Kory Cut Out Sports Bra",
        category="Activewear",
        price=31.00
    )
    product_type28 = ProductType(
        name="Chill Sweatshorts",
        category="Activewear",
        price=42.00
    )
    product_type29 = ProductType(
        name="Lavender Workout Set",
        category="Activewear",
        price=64.00
    )





    db.session.add(product_type1)
    db.session.add(product_type2)
    db.session.add(product_type3)
    db.session.add(product_type4)
    db.session.add(product_type5)
    db.session.add(product_type6)
    db.session.add(product_type7)
    db.session.add(product_type8)
    db.session.add(product_type9)
    db.session.add(product_type10)
    db.session.add(product_type11)
    db.session.add(product_type12)
    db.session.add(product_type13)
    db.session.add(product_type14)
    db.session.add(product_type15)
    db.session.add(product_type16)
    db.session.add(product_type17)
    db.session.add(product_type18)
    db.session.add(product_type19)
    db.session.add(product_type20)
    db.session.add(product_type21)
    db.session.add(product_type22)
    db.session.add(product_type23)
    db.session.add(product_type24)
    db.session.add(product_type25)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_types"))

    db.session.commit()
