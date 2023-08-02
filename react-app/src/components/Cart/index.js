import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder } from "../../store/orders";
import "./Cart.css"

function Cart() {

  const dispatch = useDispatch();
  const order = useSelector(state => state.orders)

  useEffect(() => {
      dispatch(getCurrentOrder())
}, [dispatch]);

  console.log("ORDER: ", order)

  if (Object.keys(order).length) {

    return (
      <div className="cart-container">
      {
        order.orderItems.map((item, i) => (
          <div key={i} className="order-items-container">
            <img></img>
          <p>{`${item.color}`}, {`${item.size}`}</p>
          </div>
        ))
      }
      </div>
    )
  }else {
    return <>Loading...</>
  }
}

export default Cart
