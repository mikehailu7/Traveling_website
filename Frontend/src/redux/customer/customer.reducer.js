import actionTypes from "./userAction.types";

const INITIAL_STATE = {
  currentUser: null,
  token: null,
  error: "",
  posts: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case actionTypes.SET_CURRENT_USER:
    case actionTypes.USER_FETCH_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        error: "",
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.USER_FETCH_FAILURE:
      return {
        ...state,
        token: null,
        currentUser: null,
        error: action.payload,
      };
    case actionTypes.CLEAR_USER_ERROR:
      return {
        ...state,
        error: "",
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        token: null,
        currentUser: null,
        error: "",
      };
    case actionTypes.POST_FETCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: "",
      };
    case actionTypes.POST_DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.payload),
        error: "",
      };
    case actionTypes.SIGN_OUT_FAILURE:
    case actionTypes.POST_FETCH_FAILURE:
    case actionTypes.POST_DELETE_FAILURE:
    case actionTypes.POST_PUBLISH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
