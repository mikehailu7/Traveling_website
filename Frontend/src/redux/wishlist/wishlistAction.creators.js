import wishlistActionType from "./wishlistAction.types";

export const addItemAction = (wishItem) => {
  return {
    type: wishlistActionType.ADD_ITEMS,
    payload: wishItem,
  };
};

export const purgeWishItem = (wishItem) => {
  return {
    type: wishlistActionType.PURGE_CART_ITEM,
    payload: wishItem,
  };
};

export const removeWishItem = (wishItem) => {
  return {
    type: wishlistActionType.REMOVE_CART_ITEM,
    payload: wishItem,
  };
};

export const clearWishItem = () => {
  return {
    type: wishlistActionType.CLEAR_CART_ITEMS,
  };
};
