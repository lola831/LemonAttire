const GET_PRODUCT_REVIEWS = "reviews/GET_PRODUCT_REVIEWS"

export const getProductReviews = (reviews) => ({
    type: GET_PRODUCT_REVIEWS,
    payload: reviews
})

export const loadProductReviews = (productTypeId) => async (dispatch) => {
    console.log("IN REVIEW THUNK: PRODUCT TYPE ID: ", productTypeId)
const response = await fetch(`/api/product_types/${productTypeId}/reviews`);
if (response.ok) {
    const reviews = await response.json();
    dispatch(getProductReviews(reviews));
    return reviews;
}else {
    return response;
}

}

const initialState = []

const reviewsReducer = (state = initialState, action) => {
let newState;
switch (action.type) {
    case GET_PRODUCT_REVIEWS:
        newState = { ...state };
        newState = action.payload.reviews
        return newState;
    default:
        return state;
}
}

export default reviewsReducer;
