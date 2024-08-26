import { all, call } from "redux-saga/effects";

import userSagas from "./user/user.sagas";
import houseSagas from "./house/house.sagas";
import wishlistSaga from "./wishlist/wishlist.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(houseSagas), call(wishlistSaga)]);
}
