import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer from './products';
import productTypeReducer from './productType';
import favoritesReducer from './favorites';
import ordersReducer from './orders';
import reviewsReducer from './reviews';
import stylesReducer from './styles';
import bagReducer from './bag';


const rootReducer = combineReducers({
  session,
  products: productsReducer,
  productType: productTypeReducer,
  reviews: reviewsReducer,
  favorites: favoritesReducer,
  styles: stylesReducer,
  orders: ordersReducer,
  bag: bagReducer,

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
