import houseActionTypes from "./houseAction.types";

const INITIAL_STATE = {
  trending: [],
  trendingFetching: false,
  categoryHouses: [],
  categoryFetching: false,
  housesPerCategory: [],
  perCategoryFetching: false,
  errorTrending: undefined,
  errorCategoryHouses: undefined,
  errorPerCategory: undefined,

  recentlyVisited: [],
};

const houseReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case houseActionTypes.TRENDING_FETCH_START:
      return {
        ...state,
        trendingFetching: true,
      };
    case houseActionTypes.CATEGORY_FETCH_START:
      return {
        ...state,
        categoryFetching: true,
      };
    case houseActionTypes.HOUSES_FETCH_START:
      return {
        ...state,
        perCategoryFetching: true,
      };
    case houseActionTypes.TRENDING_FETCH_SUCCESS:
      return {
        ...state,
        trending: [...action.payload],
        trendingFetching: false,
        errorTrending: undefined,
      };
    case houseActionTypes.TRENDING_FETCH_FAILURE:
      return {
        ...state,
        errorTrending: action.payload,
        trendingFetching: false,
      };
    case houseActionTypes.CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        categoryHouses: [...action.payload],
        categoryFetching: false,
        errorCategoryHouses: undefined,
      };
    case houseActionTypes.CATEGORY_FETCH_FAILURE:
      return {
        ...state,
        errorCategoryHouses: action.payload,
        categoryFetching: false,
      };
    case houseActionTypes.HOUSES_FETCH_SUCCESS:
      return {
        ...state,
        housesPerCategory: action.payload,
        perCategoryFetching: false,
        errorPerCategory: undefined,
      };
    case houseActionTypes.HOUSES_FETCH_FAILURE:
      return {
        ...state,
        errorPerCategory: action.payload,
        perCategoryFetching: false,
      };

    default:
      return state;
  }

};

export default houseReducer;
