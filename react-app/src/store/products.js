const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";


export const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    payload: products,
})



export const getAllProductsThunk = (category) => async (dispatch) => {
    console.log("IN THUNK: ===========> ", category)

    if (category === "View All") category = null;
    let url = '/api/product_types/'
    const params = new URLSearchParams();

    if (category) params.append('category', category);

    if (params.toString()) {
        url += '?' + params.toString();
    }

    console.log("URLLLLLLLLLLL: ", url)
    console.log("CATEGORY: ", category)


    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const products = await response.json();
        console.log("THUNK RESPNSEEE, ", products)
        dispatch(getAllProducts(products))
        return products;
    }
}

const initialState = {}

const productsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = {};
            console.log("ACTION.PRODUCTS", action.payload)
            console.log("NEW STATE: ", newState)
            action.payload.products.forEach(product => {
                newState[product.id] = product;
            });
            console.log("NEW STATE: ", newState)
            return newState;
        default:
            return state;
    }
}

export default productsReducer;
