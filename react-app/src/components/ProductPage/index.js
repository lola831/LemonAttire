import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams} from "react-router-dom";
import { getProductType } from "../../store/productType";
// import EditReviewForm from "../../Reviews/EditReview";
// import DeleteReviewForm from "../../Reviews/DeleteReview";
// import ReservationForm from "../../ReservationForm";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../store/favorites";
import { getCurrentOrder, modifyItem } from "../../store/orders";
import { newOrderItem } from "../../store/orders";
import { newOrder } from "../../store/orders";
import OpenModalButton from "../OpenModalButton";
import AddStyleItem from "../Styles/AddStyleItem";



// import OpenModalButton from "../OpenModalButton";
import './ProductPage.css'
import "../../App.css";
// import { loadProductReviews } from "../../store/reviews";

const ProductPage = ({ bag, updateBag}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const productType = useSelector(state => state.productType);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const order = useSelector(state => state.orders)
    // const reviews = useSelector(state => state.reviews)
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [item, setItem] = useState("")
    const [size, setSize] = useState("")
    const [imageIndex, setImageIndex] = useState("")
    const [circleS, setCircleS] = useState(true)
    const [circleM, setCircleM] = useState(false)
    const [circleL, setCircleL] = useState(false)
    const [msg, setMsg] = useState({})
    const [quantity, setQuantity] = useState(1)
    const addOne = () => setQuantity(quantity + 1)
    const minusOne = () => setQuantity(quantity - 1)

    console.log("UPDATE BAG: ", updateBag)
    console.log("MSG: ", msg)


    useEffect(() => {
        dispatch(getProductType(id));
        // dispatch(loadProductReviews(productType.id))

        if (user) {
            dispatch(getCurrentOrder())
            dispatch(getUserFavorites())
                .then(() => setLoadingFavorites(false))
                .catch((error) => {
                    console.log("Error fetching favorites:", error);
                    setLoadingFavorites(false);
                });
        } else {
            setLoadingFavorites(false);
        }
    }, [dispatch, id, user]);

    console.log("PRODUCT TYPE: ", productType)
    console.log("favorites: ", favorites)
    console.log("USER: ", user)
    console.log("ITEM: ", item)
    console.log("ORDER: ", order)
    console.log("SIZE: ", size)

    // checks if product is in user's favorites
    useEffect(() => {
        if (user && favorites.length) {
            for (let i = 0; i < favorites.length; i++) {
                console.log("ID: ", id)
                console.log("FAV PRODUCT ID", favorites[i].product_type_id)
                if (favorites[i].product_type_id == id) {
                    console.log("HERE IN FAV")
                    setFavorite(true)
                }
            }
        }
    }, [favorites, id, user]);

    const addFav = () => {
        let productId = productType.products[0].id
        if (item) productId = item.id;
        let image = item ? item.image1 : productType.products[0].image1
        dispatch(addFavorites(productType.id, productId, image))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(true))
            .catch((error) => console.log("Error adding favorite: ", error));
    };

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].product_type_id == id) {
                favId = favorites[i].id
            }
        }
        dispatch(deleteFavorites(favId))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(false))
            .catch((error) => console.log("Error deleting favorite: ", error));

    };


    const addItem = () => {
        console.log("in add item")
        if (!user) {
         history.push("/login")
         return
        }


        let totalPrice = quantity * productType.price
        let itemData = {
            product_id: item ? item.id : productType.products[0].id,
            product_type_id: productType.id,
            price: productType.price,
            quantity: quantity,
            color: item ? item.color : productType.products[0].color,
            size: size ? size : "Small",
            image: item ? item.image1 : productType.products[0].image1,
            name: productType.name,
            total_price: totalPrice

        }
        console.log("ITEMM DATA: ", itemData)
        setMsg({cart: "This item has been added to your cart"})

        if (!order) {
            // order doesnt exist and must create new one
            let orderData = { status: "pending" }
            dispatch(newOrder(orderData, itemData))
            // updateBag(bag + 1)
            updateBag(bag + quantity)
            // setMsg({cart: "This item has been added to your cart"})

        } else {
            //check if item already exists in cart
            let orderItems = order.orderItems;
            for (let i = 0; i < orderItems.length; i++) {
                let item = orderItems[i]
                if (item.image === itemData.image
                    && item.size === itemData.size) {
                    updateBag(bag + itemData.quantity)
                    console.log("ALREADY IN CARTTTTTTTTTT")
                    let quantity = item.quantity + itemData.quantity
                    let total_price = item.price * quantity
                    let add = itemData.total_price
                    let data = {
                        quantity,
                        total_price,
                        add
                    }
                    dispatch(modifyItem(order.id, item.id, data))
                    // setMsg({cart: "This item has been added to your cart"})

                    return;
                }
            }
            updateBag(bag + quantity)
            dispatch(newOrderItem(itemData, order.id))

        }
    }

    const addSize = (checkedSize) => {
        setSize(checkedSize)
        if (checkedSize === "Small") {
            setCircleS(true)
            setCircleM(false)
            setCircleL(false)
        }
        if (checkedSize === "Medium") {
            setCircleM(true)
            setCircleS(false)
            setCircleL(false)
        }
        if (checkedSize === "Large") {
            setCircleL(true)
            setCircleM(false)
            setCircleS(false)
        }
    }


    // if (Object.keys(productType).length && (order === null || Object.keys(order).length)) {
        if (Object.keys(productType).length) {

        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        const itemImageCheck = () => {
            if (item) {
                console.log("ITEMMMMM IMGGGG", item)
                let images = item.images.filter(ele => ele !== null)
                console.log("imageeeeee", images)
                return images
            } else {
                return productType.products[0].images
            }
        }

        return (
            <div className="product-page-container">
                <div className="product-area">
                    <div className="product-img-container">
                        <div className="product-small-area">
                            {itemImageCheck().map((img, i) => (
                                <img key={i} alt="" className="product-img-small" src={`${img}`} onMouseOver={() => setImageIndex(i)}></img>
                            ))}
                        </div>
                        <div className="product-img-big-container">
                            <img className="product-img-big" src={imageIndex ? `${itemImageCheck()[imageIndex]}` : `${itemImageCheck()[0]}`}></img>
                            {
                                user && (
                                    <>
                                        {
                                            favorite ? (
                                                <>
                                                    <button className="fav-button" title="Remove from Favorites" onClick={deleteFav}>
                                                        <i className="fa-solid fa-heart"></i>
                                                    </button>

                                                </>
                                            ) : (
                                                <>
                                                    <button className="fav-button" title="Add to favorites" onClick={addFav}>
                                                        <i className="far fa-heart"></i>
                                                    </button>

                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="product-name">{`${productType.name}`}</div>
                        <div className="prod-price">${`${productType.price}`}.00</div>
                        {
                            productType.products.length > 1 && (
                                <div className="color-container">
                                    {productType.products.map(item => (
                                        <>
                                            <div className="color-options" key={item.id} onMouseOver={() => setItem(item)}>
                                                <input type="checkbox" className="color-circle" key={item.id} style={{ backgroundColor: `${item.color}` }} onClick={() => setItem(item)} onMouseOver={() => setItem(item)}></input>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            )
                        }
                        <div className="size-container">
                            <button className={circleS ? "circle" : "no-circle"} onClick={() => addSize("Small")}>S</button>
                            <button className={circleM ? "circle" : "no-circle"} onClick={() => addSize("Medium")}>M</button>
                            <button className={circleL ? "circle" : "no-circle"} onClick={() => addSize("Large")}>L</button>
                        </div>

                        <div className="quantity-container">
                            <div>Quantity : </div>
                            <div className="plusminus">
                                <button className="add" disabled={quantity >= 10 ? true : false} onClick={addOne}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                <div className="number">{`${quantity}`}</div>
                                <button className="subtract" disabled={quantity <= 1 ? true : false} onClick={minusOne}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>

                        <button className="store-button add-to-bag-button" onClick={addItem} >Add to bag</button>
                        {msg.cart && (<p className="sign-up-errors">*{msg.cart}</p>)}
                        {
                            user && (
                                 <OpenModalButton
                                className="store-button add-to-style"
                                buttonText="Add to style"
                                modalComponent={<AddStyleItem styleItem={productType} setMsg={setMsg} />}
                            />
                            )

                        }
                        {msg.style && (<p className="sign-up-errors">*{msg.style}</p>)}
                    </div>
                    <div>
                        <div>Reviews</div>

                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading....</div>
    }
}

export default ProductPage;
