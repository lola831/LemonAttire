const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";


export const getAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    payload: products,
})



export const getAllProductsThunk = (category) => async (dispatch) => {

    if (category === "View All") category = null;
    let url = '/api/product_types/'
    const params = new URLSearchParams();

    if (category) params.append('category', category);

    if (params.toString()) {
        url += '?' + params.toString();
    }


    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const products = await response.json();
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
            action.payload.products.forEach(product => {
                newState[product.id] = product;
            });
            return newState;
        default:
            return state;
    }
}

export default productsReducer;
