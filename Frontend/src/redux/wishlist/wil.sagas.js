import { all, call, takeLatest, put } from "redux-saga/effects";

import userActionType from "../customer/customer.types";
import { clearWishItem } from "./wistAc.creators";

export function* clearCart() {
  yield put(clearWishItem());
}

export function* onClearCart() {
  yield takeLatest(userActionType.SIGN_OUT_SUCCESS, clearCart);
}

export default function* allCartSagas() {
  yield all([call(onClearCart)]);
}
