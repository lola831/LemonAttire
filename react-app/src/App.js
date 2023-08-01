import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Favorites from "./components/Favorites";
import Checkout from "./components/Checkout";
import { applyMiddleware } from "redux";
import AllProducts from "./components/AllProducts";
import ProductPage from "./components/ProductPage";
import "./App.css"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
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
            <ProductPage />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>

        </Switch>
      )}

    </>
  );
}

export default App;
