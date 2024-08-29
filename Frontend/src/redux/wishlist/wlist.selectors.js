import { createSelector } from "reselect";

const stateSelector = (state) => state.wishlist;

export const selectCartItems = createSelector(
  [stateSelector],
  (wishlist) => wishlist.wishlists
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (wishlists) => (wishlists ? wishlists.length : null)
);

export const selectTotalPrice = createSelector([selectCartItems], (wishlists) =>
  wishlists.reduce((accumulate, current) => {
    return accumulate + current.quantity * current.price;
  }, 0)
);
