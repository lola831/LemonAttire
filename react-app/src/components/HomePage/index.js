import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation} from "react-router-dom";
import { getAllProductsThunk } from "../../store/products";
// import { Button } from "../Button";
import "./HomePage.css"
import "../../App.css";
import NewArrivals from "../NewArrivals";

function HomePage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    // const AllProducts = useSelector(state => state.products)


    useEffect(() => {
        dispatch(getAllProductsThunk(category));
    }, [dispatch, category])



  return (
    <div className="homepage-container">
      <div>
          <NewArrivals />
      </div>
    </div>
  )
}

export default HomePage
