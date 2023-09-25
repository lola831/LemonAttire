import React from 'react'
import { useModal } from '../../context/Modal'
import { getCurrentOrder, removeOrder } from '../../store/orders'
import { editBag } from '../../store/bag'
import { useDispatch } from 'react-redux'
import "./DeleteOrder.css"

function DeleteOrder({ order }) {

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const emptyBag = () => {
    dispatch(editBag(0))
    dispatch(removeOrder(order.id))
    dispatch(getCurrentOrder())
    closeModal()
  }

  return (
    <div className='delete-order-container'>
      <div className='delete-question'>Are you sure you want to empty your bag?</div>
      <div className='delete-buttons-container'>
        <button className='store-button delete-order-buttons' onClick={emptyBag}>Yes, I'm sure</button>
        <button className='store-button delete-order-buttons' onClick={closeModal} >Ooops, no I don't</button>
      </div>
    </div>
  )
}

export default DeleteOrder
