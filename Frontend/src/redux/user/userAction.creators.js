import actionTypes from "./userAction.types";

//set user token action
export const setUserToken = (token) => {
  return {
    type: actionTypes.SET_USER_TOKEN,
    payload: token,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

/**
 * Email login action types
 */
export const clearUserError = () => {
  return {
    type: actionTypes.CLEAR_USER_ERROR,
  };
};
export const emailLoginStart = ({ email, password }) => {
  return {
    type: actionTypes.EMAIL_LOGIN_START,
    payload: { email, password },
  };
};

export const emailLoginSuccess = (userAuth) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userAuth,
  };
};

export const emailLoginFailure = (errorMessage) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: errorMessage,
  };
};

/**
 * Email signup actions
 */

export const emailRegisterStart = (payload) => {
  return {
    type: actionTypes.EMAIL_REGISTER_START,
    payload,
  };
};

export const emailRegisterSuccess = (user) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: user,
  };
};

export const emailRegisterFailure = (errorMessage) => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    payload: errorMessage,
  };
};

/**
 * User signout actions
 */
export const onUserSignOutStart = () => ({
  type: actionTypes.SIGN_OUT_START,
});

export const onUserSignOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS,
  payload: null,
});

export const onUserSignOutFailure = (err) => ({
  type: actionTypes.SIGN_OUT_FAILURE,
  payload: err,
});

/**
 * User post fetch actions
 */
export const onFetchPostStart = () => ({
  type: actionTypes.POST_FETCH_START,
});

export const onFetchPostSuccess = (posts) => ({
  type: actionTypes.POST_FETCH_SUCCESS,
  payload: posts,
});

export const onFetchPostFailure = (err) => ({
  type: actionTypes.POST_FETCH_FAILURE,
  payload: err,
});

/**
 * User post delete actions
 */
export const onDeletePostStart = (houseId) => ({
  type: actionTypes.POST_DELETE_START,
  payload: houseId,
});

export const onDeletePostSuccess = (houseId) => ({
  type: actionTypes.POST_DELETE_SUCCESS,
  payload: houseId,
});

export const onDeletePostFailure = (err) => ({
  type: actionTypes.POST_DELETE_FAILURE,
  payload: err,
});

/**
 * User post publish actions
 */
export const onPublishPostStart = (data) => ({
  type: actionTypes.POST_PUBLISH_START,
  payload: data,
});

export const onPublishPostSuccess = () => ({
  type: actionTypes.POST_FETCH_START,
});

export const onPublishPostFailure = (err) => ({
  type: actionTypes.POST_PUBLISH_FAILURE,
  payload: err,
});

/**
 * fetch user actions
 */
export const onFetchUserStart = () => ({
  type: actionTypes.USER_FETCH_START,
});

export const onFetchUserSuccess = (user) => ({
  type: actionTypes.USER_FETCH_SUCCESS,
  payload: user,
});

export const onFetchUserFailure = (err) => ({
  type: actionTypes.USER_FETCH_FAILURE,
  payload: err,
});
