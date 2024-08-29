import { all, call } from "redux-saga/effects";

import userSagas from "./customer/customer.sagas";
import houseSagas from "./place/house.sagas";
import wishlistSaga from "./wishlist/wishlist.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(houseSagas), call(wishlistSaga)]);
}
