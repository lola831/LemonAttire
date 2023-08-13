
// Action Types
const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'
const GET_USER_ORDERS = 'orders/GET_USER_ORDERS';
const ADD_ORDER = 'orders/ADD_ORDER';
const ADD_ORDER_ITEM = 'orderItems/ADD_ORDER_ITEM';
const DELETE_ORDER = 'orders/DELETE_ORDER';
const EDIT_ORDER_ITEM = 'orders/EDIT_ORDER_ITEM';
const EDIT_ORDER = 'orders/EDIT_ORDER';
const REMOVE_ORDER_ITEM = 'orders/REMOVE_ORDER_ITEM';


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

export const deleteOrder = (orderId) => ({
    type: DELETE_ORDER,
    payload: orderId
})

export const editOrderItem = (orderItem) => ({
    type: EDIT_ORDER_ITEM,
    payload: orderItem
})

export const editOrder = (order) => ({
    type: EDIT_ORDER,
    payload: order
})

export const removeItem = (orderItemId) => ({
    type: REMOVE_ORDER_ITEM,
    payload: orderItemId
})

// Thunks
export const getCurrentOrder = () => async (dispatch) => {

    const response = await fetch(`/api/orders/current/pending`);
    if (response.ok) {

        const order = await response.json();

        dispatch(currentOrder(order));
        return order;
    } else {
        return response;
    }
}

export const getUserOrders = () => async (dispatch) => {

    const response = await fetch(`/api/orders/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const orders = await response.json();

        dispatch(loadOrders(orders));
        return orders;
    } else {
        return response;
    }
}

export const newOrder = (orderData, itemData) => async dispatch => {
    // console.log("in thunk, data", orderData)
    const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (response.ok) {
        const order = await response.json();
        // console.log("response!!!!! ", order)
        dispatch(addOrder(order));
        dispatch(newOrderItem(itemData, order.id))
        return order;
    } else {

        return response;
    }
}

export const newOrderItem = (data, orderId) => async dispatch => {
    // console.log("in new order item thunk, data = ", data)
    // console.log("ORDER ID: ", orderId)
    // console.log("item DATA: ", data)
    dispatch(modifyOrder(orderId, data))

    const response = await fetch(`/api/orders/${orderId}/order_items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const orderItem = await response.json();
        // console.log("ORDER ITEM response!!!!! ", orderItem)
        dispatch(addOrderItem(orderItem));
        return orderItem;
    } else {
        // console.log("EERROR: ", response)
        return response
    }


}

export const modifyOrder = (orderId, data) => async dispatch => {
    // console.log("in thunkkkkkkk for edit order", data)
     const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    //  console.log("MODIFY ORDER RESPONSE", response)
    if (response.ok) {
        const order = await response.json();
        // console.log("ORDER response!!!!! ", order)
        dispatch(editOrder(order));
        return order;
    } else {
        return response;
    }
};

export const modifyItem = (orderId, itemId, data) => async dispatch => {

    // console.log("HEREeeeeeeeeeeeeee", orderId, itemId, data)

    dispatch(modifyOrder(orderId, data))

    const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    //  console.log("MODIFY ORDER RESPONSE", response)
    if (response.ok) {
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

    if (response.ok){
        dispatch(deleteOrder(orderId))
         return response;
       }else {
        return response;
       }
}

export const deleteItem = (orderId, item) => async (dispatch) => {
    let itemId = item.id;
    // console.log("in thunkkkkkkk for delete item")
    dispatch(modifyOrder(orderId, {delete: item.total_price}))
    const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        // dispatch(removeItem(itemId))
        dispatch(getCurrentOrder())
        return response;
    } else {
        return response;
    }
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_ORDERS: {
            return action.payload.orders;
        }
        case GET_CURRENT_ORDER:
            newState = { ...state };
            // console.log("ACTION PAYLOAD: ", action.payload)
            if (!Object.keys(action.payload).length) {
                newState = null;
                return newState
            }
            newState = action.payload;
            return newState;
        case ADD_ORDER: {
            newState = { ...state };
            newState = action.payload
            return newState;
        }
        case ADD_ORDER_ITEM: {
            newState = { ...state };
            // console.log("NEW STATE:  ", newState)
            newState.orderItems.push(action.payload)
            return newState;
        }
        case EDIT_ORDER_ITEM: {
            newState = { ...state };
            let index = newState.orderItems.findIndex(x => x.id === action.payload.id);
            // console.log("INDEX: ", index)
            newState.orderItems[index] = action.payload
            return newState;
        }
        case EDIT_ORDER: {
            newState = { ...state };
            newState.totalPrice = action.payload.totalPrice
            newState.tax = action.payload.tax
            newState.price = action.payload.price
            return newState;
        }

        case DELETE_ORDER: {
            newState = { ...state };
            if (newState.id === action.payload){
                // console.log("SAMMMMEEEE ID ")
                newState = {}
            }
            return newState;
        }
        case REMOVE_ORDER_ITEM: {
            newState = { ...state };
            return newState.orderItems.filter((item) => item.id !== action.payload)


        }
        default:
            return state;
    }
};

export default ordersReducer;
