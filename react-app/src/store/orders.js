
// Action Types
const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'
const GET_USER_ORDERS = 'orders/GET_USER_ORDERS';
const ADD_ORDER = 'orders/ADD_ORDER';
const ADD_ORDER_ITEM = 'orderItems/ADD_ORDER_ITEM';
const DELETE_ORDER = 'orders/DELETE_ORDER';
const EDIT_ORDER_ITEM = 'orders/EDIT_ORDER_ITEM';

// Action Creators
export const currentOrder = (order) => ({
    type: GET_CURRENT_ORDER,
    payload: order
})

export const loadOrders = (orders) => ({
    type: GET_USER_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});

export const addOrderItem = (orderItem) => ({
    type: ADD_ORDER_ITEM,
    payload: orderItem
});

export const deleteOrder = (order) => ({
    type: DELETE_ORDER,
    payload: order
})

export const editOrderItem = (orderItem) => ({
    type: EDIT_ORDER_ITEM,
    payload: orderItem
})

// Thunks
export const getCurrentOrder = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/orders/current/pending`);
    if (response.ok) {
        console.log("IN RESSSPONSSSEEEEEEEEE")
        const order = await response.json();
        console.log("in thunk response, ", order)
        dispatch(currentOrder(order));
        return response;
    }else {
        return response;
    }
}

export const getUserOrders = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/orders/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const orders = await response.json();
        console.log("in thunk response, ", orders)
        dispatch(loadOrders(orders));
        return orders;
    }else {
        return response;
    }
}

export const newOrder = (orderData, itemData) => async dispatch => {
    console.log("in thunk, data", orderData)
    const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (response.ok) {
        const order = await response.json();
        console.log("response!!!!! ", order)
        dispatch(addOrder(order));
        dispatch(newOrderItem(itemData, order.id))
        return order;
    }else {

        return response;
    }
}

export const newOrderItem = (data, orderId) => async dispatch => {
    console.log("in new order item thunk, data = ", data)
    console.log("ORDER ID: ", orderId)
    console.log("item DATA: ", data)

    const response = await fetch(`/api/orders/${orderId}/order_items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const orderItem = await response.json();
        console.log("ORDER ITEM response!!!!! ", orderItem)
        dispatch(addOrderItem(orderItem));
        return orderItem;
    }else {
        console.log("EERROR: ", response)
        return response
    }
}

export const modifyOrder = (orderId, itemId, data) => async dispatch => {
    // console.log("HERE")
    const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
        //  console.log("MODIFY ORDER RESPONSE", response)
         if (response.ok){
            const orderItem = await response.json();
            console.log("ORDER ITEM response!!!!! ", orderItem)
            dispatch(editOrderItem(orderItem));
            return orderItem;
         } else {
          return response;
         }
     };

     export const modifyItem = (orderId, itemId, data) => async dispatch => {
        console.log("HEREeeeeeeeeeeeeee", orderId, itemId, data )
             const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
               method: 'PUT',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
             });
            //  console.log("MODIFY ORDER RESPONSE", response)
             if (response.ok){
                const orderItem = await response.json();
                dispatch(editOrderItem(orderItem))
               return orderItem;
             } else {
              return response;
             }
         };

export const removeOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    });
    return response;
    // if (response.ok){
    //     // console.log("here after  delete order fetch")
    //     //  dispatch(getAllSpots());
    //     // //  dispatch(getSpotsUser());
    //      return response;
    //    }else {
    //     return response;
    //    }
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case GET_USER_ORDERS: {
          return action.payload.orders;
        }
      case GET_CURRENT_ORDER:
        newState = {...state};
        console.log("ACTION PAYLOAD: ", action.payload)
        newState = action.payload;
        return newState;
      case ADD_ORDER: {
        newState = {...state};
        newState = action.payload
        return newState;
      }
      case ADD_ORDER_ITEM: {
          newState = {...state};
          console.log("NEW STATE:  ", newState)
          newState.orderItems.push(action.payload)
        // newState = action.payload
        return newState;
      }
      case EDIT_ORDER_ITEM: {
        newState = {...state};
        console.log("NEWS STATE ORDER ITEMS: ", newState.orderItems)
        console.log("ACTION PAYLOAD", action.payload)
        let index = newState.orderItems.findIndex(x => x.id === action.payload.id);
        console.log("INDEX: ", index)
        newState.orderItems[index] = action.payload
        return newState;
      }

      case DELETE_ORDER: {
        return state.filter((order) => order.id !== action.payload);
      }
      default:
        return state;
    }
  };

export default ordersReducer;
