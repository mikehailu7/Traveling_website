import actionTypes from "./wishlistAction.types";
import { addItemToCart } from "./wishlist-utils";

const INITIAL_STATE = {
  wishlists: [],
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS:
      return {
        ...state,
        wishlists: addItemToCart(state.wishlists, action.payload),
      };
    case actionTypes.PURGE_CART_ITEM:
      return {
        ...state,
        wishlists: state.wishlists.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    // case actionTypes.REMOVE_CART_ITEM:
    //   return {
    //     ...state,
    //     wishlists: removeItemFromCart(state.wishlists, action.payload),
    //   };
    case actionTypes.CLEAR_CART_ITEMS:
      return {
        ...state,
        wishlists: [],
      };
    default:
      return state;
  }
};

export default wishlistReducer;
