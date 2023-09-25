import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { submitOrder } from '../../store/orders';
import { AddressAutofill } from '@mapbox/search-js-react'
import { setBag } from '../../store/bag';
import ConfirmationPage from '../ConfirmationPage';
import emailjs from '@emailjs/browser';
import "./ShippingPage.css"

function ShippingPage() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const order = useSelector(state => state.orders)
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [cardnumber, setCardnumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCvv] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    if (!user) return (
        <Redirect to='/login'></Redirect>
    )

     const handleSubmit = async (e) => {
        e.preventDefault();

        
        const data = {
            name: user.firstName,
            confirmation_number: "#8485950505",
            email: user.email
        }

        // dispatch(submitOrder(order.id))

        await emailjs.send('gmail', 'template_h3e28eo', data, '8AnBwut9yyPZ1CjYX')
        .then((result) => {
            console.log(result.text);
            // dispatch(submitOrder(order.id))
        }, (error) => {
            console.log(error.text);
        })
            dispatch(setBag(0))

            dispatch(submitOrder(order.id))

    }



    if (!order) {
        return <ConfirmationPage />
    }


    if (order && Object.keys(order).length) {
        return (
            <div className='shipping-container'>

                <form className='shipping-form'>

                    <div className='shipping-name'>Shipping Address</div>


                <AddressAutofill accessToken='pk.eyJ1IjoibG9sYW1hcnJlcm8iLCJhIjoiY2xtODJlYzFxMDRxYjNzbGJ0NzBmN3Z2bCJ9._0qzVpfHwA3vy3a47nT8DQ'>
                    <div className='shipping-input'>
                        <label>
                            Street Address:
                        </label>
                        <input
                            className='ship-input long-input'
                            autoComplete='address-line1'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required>
                        </input>
                    </div>
                    </AddressAutofill>

                    <div className='shipping-input'>
                        <label>
                            City:
                        </label>
                        <input
                            className='ship-input long-input'
                            autoComplete='address-level2'
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input'>
                        <label>
                            State:
                        </label>
                        <input
                            className='ship-input short-input'
                            autoComplete='address-level1'
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input zip'>
                        <label>
                            ZIP Code:
                        </label>
                        <input
                            className='ship-input short-input'
                            autoComplete='postal-code'
                            type="text"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='payment-details'>Payment Details</div>

                    <div className='shipping-input'>
                        <label>
                            Card Number:
                        </label>
                        <input
                            className='ship-input long-input'
                            type="text"
                            value={cardnumber}
                            onChange={(e) => setCardnumber(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input'>
                        <label>
                            Expiration Date (MM/YY):
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                            required>
                        </input>
                    </div>

                    <div className='shipping-input cvv'>
                        <label>
                            Security Code (CVV):
                        </label>
                        <input
                            className='ship-input short-input'
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required>
                        </input>
                    </div>

                    <button onClick={handleSubmit} className='store-button-white'>Place Order</button>

                </form>

                <div className='order-sum-box'>
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
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }

}

export default ShippingPage
