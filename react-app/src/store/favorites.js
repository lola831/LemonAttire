
// Action Types
const GET_USER_FAVORITES = 'favorites/GET_USER_FAVORITEs';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';

// Action Creators
export const loadUserFavorites = (favorites) => ({
    type: GET_USER_FAVORITES,
    payload: favorites
});

export const addFavorite = (favorite) => ({
    type: ADD_FAVORITE,
    payload: favorite
});

export const deleteFavorite = (favorite) => ({
    type: DELETE_FAVORITE,
    payload: favorite
})

// Thunks
export const getUserFavorites = () => async (dispatch) => {
    console.log("in thunk")
    const response = await fetch(`/api/favorites/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const favorites = await response.json();
        console.log("in thunk response, ", favorites)
        dispatch(loadUserFavorites(favorites));
        return favorites;
    }
}

export const addFavorites = (productTypeId, productId, image) => async (dispatch) => {
    console.log("in thunk, product id = ", productId)
    console.log("in thunk, product type id", productTypeId)
    console.log("in thunk, product image", image)
    const response = await fetch(`/api/product_types/${productTypeId}/products/${productId}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({image: image})
    });

    if (response.ok) {
        const favorite = await response.json();
        console.log("response!!!!! ", favorite)
        dispatch(addFavorite(favorite));
        return favorite;
    }
}

export const deleteFavorites = (favId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favId}`, {
        method: 'DELETE',
    });

    dispatch(deleteFavorite(favId));
    return response;
}

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_FAVORITES: {
          return action.payload.favorites;
        }
      case ADD_FAVORITE: {
        return [...state, action.payload];
      }
      case DELETE_FAVORITE: {
        return state.filter((favorite) => favorite.id !== action.payload);
      }
      default:
        return state;
    }
  };

export default favoritesReducer;
