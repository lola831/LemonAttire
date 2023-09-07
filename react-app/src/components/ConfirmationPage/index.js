import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

function ConfirmationPage() {

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    if (!user) return (
        <Redirect to='/login'></Redirect>
    )


    return (
        <div className='order-conf-container'>
            <div className='order-conf-title'>Order Confirmation</div>
            <div>Order Number: #8485950505</div>
            <div>{user.firstName}, thank you for your order!</div>
            <div className='conf-msg'>We've received your order and will contact you as soon as your package is shipped. You'll soon receive a confirmation email in your inbox.</div>
            <Link className='new-order' to="/">Place a new order!</Link>
        </div>
    )
}

export default ConfirmationPage
