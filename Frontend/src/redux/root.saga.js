import { all, call } from "redux-saga/effects";

import userSagas from "./customer/customer.sagas";
import houseSagas from "./place/place.sagas";
import wishlistSaga from "./wishlist/wil.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(houseSagas), call(wishlistSaga)]);
}
