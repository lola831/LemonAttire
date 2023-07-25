import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation} from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    const AllProducts = useSelector(state => state.products)
    const productValues = Object.values(AllProducts)

    // function shuffle(productValues) {
    //     let currentIndex = productValues.length, temporaryValue, randomIndex;
    //     while (0 !== currentIndex) {
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;
    //         temporaryValue = productValues[currentIndex];
    //         productValues[currentIndex] = productValues[randomIndex];
    //         productValues[randomIndex] = temporaryValue;
    //     }
    //     return productValues;
    // }
    // const shuffledRestaurants = shuffle(restaurantValues)
    // const selectedRestaurants = shuffledRestaurants.slice(0, 12)



    useEffect(() => {
        console.log("IN DISPATCH")
        dispatch(getAllProductsThunk(category));
        console.log("IN DISPATCH22222")
    }, [dispatch, category])

    console.log("1: IN RESTAURANTS COMPONENT", AllProducts);
    console.log("1: -------------------------", productValues);



  return (
    <div>HomePage</div>
  )
}

export default HomePage
