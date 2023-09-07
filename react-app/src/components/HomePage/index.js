import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useLocation} from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
// import { Button } from "../Button";
import AllProducts from "../AllProducts";
import "./HomePage.css"
import "../../App.css";
// import NewArrivals from "../NewArrivals";
import Video from "../Video";

function HomePage() {
    const dispatch = useDispatch();
    

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch])



  return (
    <div className="homepage-container">
      <div className="vid-container">
          <Video />
      </div>

      <div className="featured-collection-box">
        <div className="feature-collection-text">
        Featured Collection
        </div>
      </div>

      <div className="all-prods-container">
        <AllProducts />
      </div>


    </div>
  )
}

export default HomePage
