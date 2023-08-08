import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Favorites from "./components/Favorites";
import Cart from "./components/Cart";
// import { applyMiddleware } from "redux";
import AllProducts from "./components/AllProducts";
import ProductPage from "./components/ProductPage";
import Styles from "./components/Styles";
import StylesDetails from "./components/Styles/StylesDetails";
import Footer from "./components/Footer";
// import NewArrivals from "./components/NewArrivals";
import "./App.css"
import { getCurrentOrder } from "./store/orders";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session)
  const order = useSelector(state => state.orders)
  const [isLoaded, setIsLoaded] = useState(false);
  const [bag, updateBag] = useState()

  console.log("BAG IN APP.JS: ", bag)
  useEffect(() => {
    dispatch(authenticate())
    .then((data) => {
      setIsLoaded(true)
      console.log("IN app.js ==================== ", data)
    })
    .then(() => {
      if (user) {
        dispatch(getCurrentOrder())
        .then((order) => {
          if (Object.keys(order).length) {
            if (order.orderItems.length) {
              updateBag(order.orderItems.length)
            }
          }
        })
      }
    })
    // .then(() => dispatch() );
    // if (user) {
    //   dispatch(getCurrentOrder()).then(() => {
    //     if
    //   })
    // }
  }, [dispatch, bag]);

  return (
    <>

      <Navigation isLoaded={isLoaded} bag={bag} updateBag={updateBag} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route exact path="/shop">
            <AllProducts />
          </Route>
          <Route exact path="/shop/:id">
            <ProductPage bag={bag} updateBag={updateBag}/>
          </Route>
          {/* <Route exact path="/new-arrivals">
            <NewArrivals />
          </Route> */}
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/checkout">
            <Cart bag={bag} updateBag={updateBag}/>
          </Route>
          <Route exact path="/styles/:styleId">
            <StylesDetails />
          </Route>
          <Route path="/styles">
            <Styles />
          </Route>
        </Switch>
      )}
        <Footer />
    </>
  );
}

export default App;
