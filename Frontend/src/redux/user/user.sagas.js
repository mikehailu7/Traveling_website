import { takeLatest, call, put, all } from "redux-saga/effects";
import userActionTypes from "./userAction.types";
import { loginBackend } from "../../backend-utils/auth-utils";
import {
  getUserPosts,
  deleteUserPosts,
  publishUserPosts,
  getUser,
} from "../../backend-utils/user-utils";
import {
  emailLoginSuccess,
  emailLoginFailure,
  onUserSignOutSuccess,
  onUserSignOutFailure,
  onFetchPostSuccess,
  onFetchPostFailure,
  onDeletePostSuccess,
  onDeletePostFailure,
  onPublishPostFailure,
  onPublishPostSuccess,
  onFetchUserSuccess,
  onFetchUserFailure,
} from "./userAction.creators";

/**
 * Fetch user
 */

export function* fetchUser() {
  try {
    const user = yield call(getUser);
    yield put(onFetchUserSuccess(user.user));
  } catch (error) {
    yield put(onFetchUserFailure(error.message));
  }
}

export function* onFetchUserStart() {
  yield takeLatest(userActionTypes.USER_FETCH_START, fetchUser);
}

/**
 * Fetch user posts
 */

export function* fetchUserPosts() {
  try {
    const posts = yield call(getUserPosts);
    yield put(onFetchPostSuccess(posts.houses));
  } catch (error) {
    yield put(onFetchPostFailure(error.message));
  }
}

export function* onUserPostFetchStart() {
  yield takeLatest(userActionTypes.POST_FETCH_START, fetchUserPosts);
}

/**
 * Publish user posts
 */

export function* publishUserPost({ payload }) {
  try {
    console.log("payload", payload);
    yield call(publishUserPosts, payload);
    yield put(onPublishPostSuccess());
  } catch (error) {
    yield put(onPublishPostFailure(error.message));
  }
}

export function* onUserPostPublishStart() {
  yield takeLatest(userActionTypes.POST_PUBLISH_START, publishUserPost);
}

/**
 * Delete user post
 */

export function* removeUserPosts({ payload }) {
  try {
    yield call(deleteUserPosts, payload);
    yield put(onDeletePostSuccess(payload));
  } catch (error) {
    yield put(onDeletePostFailure(error.message));
  }
}

export function* onUserPostDeleteStart() {
  yield takeLatest(userActionTypes.POST_DELETE_START, removeUserPosts);
}

/**
 * Logout user saga
 */

export function* userLogout() {
  try {
    yield put(onUserSignOutSuccess());
  } catch (error) {
    yield put(onUserSignOutFailure(error.message));
  }
}

export function* userLogoutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, userLogout);
}

/**
 * Email login sagas
 */

export function* emailLogin({ payload: { email, password } }) {
  try {
    const userData = yield call(loginBackend, { email, password });
    if (userData.error) throw new Error(userData.error);

    yield put(emailLoginSuccess(userData));
  } catch (error) {
    yield put(emailLoginFailure(error.message));
  }
}

export function* emailLoginStart() {
  yield takeLatest(userActionTypes.EMAIL_LOGIN_START, emailLogin);
}

/**
 * General user sagas
 */

export default function* userSaga() {
  yield all([
    call(emailLoginStart),
    call(userLogoutStart),
    call(onUserPostFetchStart),
    call(onUserPostDeleteStart),
    call(onUserPostPublishStart),
    call(onFetchUserStart),
  ]);
}
