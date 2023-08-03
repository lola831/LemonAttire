import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder, modifyItem, deleteItem } from "../../store/orders";

import "./Cart.css"

function Cart() {

  const dispatch = useDispatch();
  const order = useSelector(state => state.orders)
  // const [quantity, setQuantity] = useState()
  // const addOne = () => setQuantity(quantity + 1)
  // const minusOne = () => setQuantity(quantity - 1)

  useEffect(() => {
    dispatch(getCurrentOrder())
  }, [dispatch]);

  console.log("ORDER: ", order)

  const addOne = (item) => {
    let quantity = item.quantity + 1;
    let total_price = item.price * quantity;
    let data = {
      quantity,
      total_price
    }
    dispatch(modifyItem(order.id, item.id, data))
  }
  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let data = {
      quantity,
      total_price
    }
    dispatch(modifyItem(order.id, item.id, data))
  }

  const removeItem = (itemId) => {
    console.log("Order  id : ", order.id)
    console.log("ITEM id : ", itemId)
    dispatch(deleteItem(order.id, itemId))
    // dispatch(getCurrentOrder())

  }

  if (Object.keys(order).length) {


    return (
      <div className="cart-container">
        {
          order.orderItems.map((item, i) => (

            <div key={i} className="order-item-container">
              <Link to={`/shop/${item.productTypeId}`}>
              <img className="order-item-img" src={item.image}></img>
              </Link>
              <div className="order-item-info">
                <div>{`${item.name}`}</div>
                <div className="order-item-color-size">{`${item.color}`}, {`${item.size}`}</div>
                <div className="order-item-price">${`${item.total_price}`}</div>

                <div className="quantity-container">
                        <div>Qty: </div>
                        <button className="add" disabled={item.quantity >=10 ? true : false} onClick={() => addOne(item)}>
                        <i className="fa-solid fa-plus"></i>
                        </button>
                        <div className="number">{item.quantity}</div>
                        <button className="subtract" disabled={item.quantity <= 1 ? true : false} onClick={() => minusOne(item)}>
                        <i class="fa-solid fa-minus"></i>
                        </button>
                </div>
                <button onClick={() => removeItem(item.id)}>Remove</button>

              </div>
            </div>
          ))
        }
      </div>
    )
  } else {
    return <>Loading...</>
  }
}

export default Cart
