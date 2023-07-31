import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductType } from "../../store/productType";
// import EditReviewForm from "../../Reviews/EditReview";
// import DeleteReviewForm from "../../Reviews/DeleteReview";
// import OpenModalButton from "../../OpenModalButton";
// import ReservationForm from "../../ReservationForm";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../store/favorites";
import './ProductPage.css'

const ProductPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productType = useSelector(state => state.productType);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        dispatch(getProductType(id));
        if (user) {
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

    // const addFav = () => {
    //     dispatch(addFavorites(productTypeId, productId))
    //         .then(() => dispatch(getUserFavorites()))
    //         .then(() => setFavorite(true))
    //         .catch((error) => console.log("Error adding favorite: ", error));
    // };

    // const deleteFav = () => {
    //     let favId;
    //     for (let i = 0; i < favorites.length; i++) {
    //         // if(favorites[i].restaurantId == id) {           ???product.product_type_id>??
    //         //     favId = favorites[i].id
    //         // }
    //     }
    //     // console.log("hereeeee, ", favId)
    //             dispatch(deleteFavorites(favId))
    //                 .then(() => dispatch(getUserFavorites()))
    //                 .then(() => setFavorite(false))
    //                 .catch((error) => console.log("Error deleting favorite: ", error));

    // };

    if (Object.keys(productType).length) {
        let products = productType.products
        let images;
        let imagesArray = [];
        for (let i = 0; i < products.length; i++) {
            images = products[i].images.filter(Boolean)
            imagesArray.push(images)
        }
        console.log("images array", imagesArray)

        // let reviews = "Reviews";
        // if (restaurant.reviews.length === 1) reviews = "Review";

        // star rating
        // const fullStars = Math.floor(restaurant.averageRating);
        // const starArr = [];
        // for (let i = 1; i <= fullStars; i++) {
        //     starArr.push(1);
        // }
        // if (restaurant.averageRating < 5) {
        //     const partialStar = restaurant.averageRating - fullStars;
        //     starArr.push(partialStar);
        //     const emptyStars = 5 - starArr.length;
        //     for (let i = 1; i <= emptyStars; i++) {
        //         starArr.push(0);
        //     }
        // }

        // const monthNames = ["January", "February", "March", "April", "May", "June",
        // "July", "August", "September", "October", "November", "December"
        // ];

        // const convertDate = (date) => {
        //     const month = monthNames[new Date(date).getMonth()];
        //     const year = new Date(date).getFullYear();

        //     return (
        //         <p className="reviews-date">{month} {year}</p>
        //     )
        // }

        // const makeStars = (rating) => {
        //     const starArr = [];
        //     for (let i = 1; i <= 5; i++) {
        //         if (i <= rating) {
        //             starArr.push(<i key={i} className='fa-solid fa-star '></i>);
        //         } else {
        //             starArr.push(<i key={i} className='fa-regular fa-star'></i>);
        //         }
        //     }
        //     return starArr;
        // }



        // console.log("STARRRRR", starArr)
        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        return (
            <div className="product-page-container">
            <div className="product-img-container">
                <div className="product-small-area">
                {imagesArray[0].map(img => (
                    <img className="product-img-small" src={`${img}`}></img>
                ))}
                </div>
            <img className="product-img-big" src={`${imagesArray[0][0]}`}></img>
            </div>
            </div>
        )
    } else {
        return <div>Loading....</div>
    }
}

export default ProductPage;
