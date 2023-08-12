import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder, modifyItem, deleteItem } from "../../store/orders";
import { editBag } from "../../store/bag";
import OpenModalButton from "../OpenModalButton";
import DeleteOrder from "../DeleteOrder";

import "./Cart.css"

function Cart() {

  const dispatch = useDispatch();
  const order = useSelector(state => state.orders)
  const user = useSelector(state => state.session.user)
  const bag = useSelector(state => state.bag)


  useEffect(() => {
    dispatch(getCurrentOrder())
  }, [dispatch]);

  if (!user) return (
    <Redirect to='/login'></Redirect>
  )

  const addOne = (item) => {
    let quantity = item.quantity + 1;
    let total_price = item.price * quantity;
    let add = item.price;
    let data = {
      quantity,
      total_price,
      add
    }
    dispatch(editBag(bag + 1))
    dispatch(modifyItem(order.id, item.id, data))
  }
  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let minus = item.price
    let data = {
      quantity,
      total_price,
      minus
    }
    dispatch(editBag(bag - 1))
    dispatch(modifyItem(order.id, item.id, data))
  }

  const removeItem = (item) => {
    dispatch(deleteItem(order.id, item))
    console.log("BAAAAAAAG", bag)
    console.log("ITEMMMMM ", item)
    let newBag = bag - item.quantity;
    console.log("new Bag", newBag)
    dispatch(editBag(bag - item.quantity))
  }

  // if (order && Object.keys(order).length) {
    if (bag) {
    return (
      <>
        <h1 className="page-header">My bag</h1>
        <div className="cart-container">
          <div className="order-items-container">
            {
              order.orderItems.map((item, i) => (

                <div key={i} className="order-item-container">
                  <Link to={`/shop/${item.productTypeId}`}>
                    <img alt="" className="order-item-img" src={item.image}></img>
                  </Link>
                  <div className="order-item-info">
                    <div>{`${item.name}`}</div>
                    <div className="order-item-color-size">{`${item.color}`}, {`${item.size}`}</div>
                    <div className="order-item-price">${`${item.price}`}.00</div>

                    <div className="quantity-container">
                      <div>quantity: </div>
                      <button className="add" disabled={item.quantity >= 10 ? true : false} onClick={() => addOne(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <div className="number">{item.quantity}</div>
                      <button className="subtract" disabled={item.quantity <= 1 ? true : false} onClick={() => minusOne(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                    {item.quantity > 1 && (
                       <div className="order-item-price">total: ${`${item.total_price}`}.00</div>
                    )}
                    <button className="store-button remove-order-item" onClick={() => removeItem(item)}>Remove</button>

                  </div>
                </div>
              ))
            }
          </div>

          <div>
            <div className="order-summary-container">
              <div className="order-summary">Order Summary</div>
              <div className="order-price">
                subtotal:<span>${order.price}.00</span>
              </div>
              <div className="order-price">
              tax:<span>${order.tax.toFixed(2)}</span>
                </div>
              <div className="order-price total">
              total price:<span>${order.totalPrice.toFixed(2)}</span>
                </div>
            </div>
            <button className="store-button-white checkout-now">Checkout now</button>
            <OpenModalButton
              buttonText="Empty bag"
              modalComponent={<DeleteOrder order={order} />}
            />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className="empty-cart">
        <div className="empty-cart-message">Your shopping bag is empty.</div>
        <Link to="/shop">
          <button className="store-button-white">
            Continue Shopping
          </button>
        </Link>
      </div>
    )
  }
}

export default Cart
