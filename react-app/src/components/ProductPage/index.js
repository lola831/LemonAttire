import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductType } from "../../store/productType";
// import EditReviewForm from "../../Reviews/EditReview";
// import DeleteReviewForm from "../../Reviews/DeleteReview";
// import ReservationForm from "../../ReservationForm";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../store/favorites";
import { getCurrentOrder } from "../../store/orders";
import { newOrderItem } from "../../store/orders";
import { newOrder } from "../../store/orders";

// import OpenModalButton from "../OpenModalButton";
import AddOrderItem from "../AddOrderItem";
import './ProductPage.css'
import "../../App.css";

const ProductPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productType = useSelector(state => state.productType);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const order = useSelector(state => state.orders)
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [item, setItem] = useState("")
    const [size, setSize] = useState("")
    const [imageIndex, setImageIndex] = useState("")
    const [orderItem, setOrderItem] = useState({})
    const [quantity, setQuantity] = useState(1)
    const addOne = () => setQuantity(quantity + 1)
    const minusOne = () => setQuantity(quantity - 1)

    let index = 0;

    useEffect(() => {
        dispatch(getProductType(id));

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

    // checks if product is in user's favorites
    useEffect(() => {
        if (user && favorites.length) {
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].product_type_id === id) {
                    setFavorite(true)
                }
            }
        }
    }, [favorites, id, user]);

    const addFav = () => {
        let productId = 1;
        if (index !== 0) productId = index;
        let image = productType.products[productId-1].image1
        dispatch(addFavorites(productType.id, productId, image))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(true))
            .catch((error) => console.log("Error adding favorite: ", error));
    };

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].product_type_id === id) {
                favId = favorites[i].id
            }
        }
        dispatch(deleteFavorites(favId))
            .then(() => dispatch(getUserFavorites()))
            .then(() => setFavorite(false))
            .catch((error) => console.log("Error deleting favorite: ", error));

    };



    const addItem = () => {


        let itemData = {
            product_id: item ? item.id : productType.products[0].id,
            product_type_id: productType.id,
            price: productType.price,
            quantity: quantity,
            color: item ? item.color: productType.products[0].color,
            size: item ? size : "Small",
            image: item ? item.image1 : productType.products[0].image1,
            name: productType.name
        }

        if (!Object.keys(order).length){
            // order doesnt exist and must create new one
            let orderData = {status: "pending"}

            dispatch(newOrder(orderData, itemData))

        }else {
            dispatch(newOrderItem(itemData, order.id))
        }
    }

    if (Object.keys(productType).length) {
        let products = productType.products

        console.log("ORDER ITEMMMMMM: ", orderItem)

        let images;
        let imagesArray = [];
        for (let i = 0; i < products.length; i++) {
            images = products[i].images.filter(Boolean)
            imagesArray.push(images)
        }

        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        if (item) index = item.id - 1;

        return (
            <div className="product-page-container">
                <div className="product-area">
                    <div className="product-img-container">
                        <div className="product-small-area">
                            {imagesArray[index].map((img, i) => (
                                <img key={i} className="product-img-small" src={`${img}`} onMouseOver={() => setImageIndex(i)}></img>
                            ))}
                        </div>
                        <div className="product-img-big-container">
                            <img className="product-img-big" src={imageIndex ? `${imagesArray[index][imageIndex]}` : `${imagesArray[index][0]}`}></img>
                            {
                                user && (
                                    <>
                                        {
                                            favorite ? (
                                                <button className="fav-button" onClick={deleteFav}>
                                                    <i className="fa-solid fa-heart"></i>
                                                </button>
                                            ) : (
                                                <button className="fav-button" onClick={addFav}>
                                                    <i className="far fa-heart"></i>
                                                </button>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="product-name">{`${productType.name}`}</div>
                        <div>${`${productType.price}`}</div>
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
                        <button className="circle" onClick={() => setSize("Small")}>S</button>
                        <button className="circle" onClick={() => setSize("Medium")}>M</button>
                        <button className="circle" onClick={() => setSize("Large")}>L</button>
                        </div>

                        <div className="quantity-container">
                        <div>Qty: </div>
                        <button className="add" disabled={quantity >= 10 ? true : false} onClick={addOne}>
                        <i className="fa-solid fa-plus"></i>
                        </button>
                        <div className="number">{`${quantity}`}</div>
                        <button className="subtract"disabled={quantity <= 1 ? true : false} onClick={minusOne}>
                        <i class="fa-solid fa-minus"></i>
                        </button>
                        </div>

                        <button onClick={addItem} >ADD TO BAG</button>
                        <div>DESCRIPTION
                            <div>{`${productType.description}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading....</div>
    }
}

export default ProductPage;
