import houseActionTypes from "./houseAction.types";

/**
 * Trending houses fetch action creators
 */
export const onTrendingFetchStart = () => {
  return { type: houseActionTypes.TRENDING_FETCH_START };
};
export const onTrendingFetchSuccess = (trendingHouses) => {
  return {
    type: houseActionTypes.TRENDING_FETCH_SUCCESS,
    payload: trendingHouses,
  };
};
export const onTrendingFetchFailure = (errMsg) => {
  return { type: houseActionTypes.TRENDING_FETCH_FAILURE, payload: errMsg };
};

/**
 * House category action creators
 */
export const onCategoryFetchStart = (limit = null) => {
  return { type: houseActionTypes.CATEGORY_FETCH_START, payload: limit };
};
export const onCategoryFetchSuccess = (categories) => {
  return { type: houseActionTypes.CATEGORY_FETCH_SUCCESS, payload: categories };
};
export const onCategoryFetchFailure = (errMsg) => {
  return { type: houseActionTypes.CATEGORY_FETCH_FAILURE, payload: errMsg };
};

/**
 * Category detail action creators
 */
export const onCategoryHouseFetchStart = ({ categoryId }) => {
  return {
    type: houseActionTypes.HOUSES_FETCH_START,
    payload: categoryId,
  };
};
export const onCategoryHouseFetchSuccess = (houses) => {
  return {
    type: houseActionTypes.HOUSES_FETCH_SUCCESS,
    payload: houses,
  };
};
export const onCategoryHouseFetchFailure = (errMsg) => {
  return {
    type: houseActionTypes.HOUSES_FETCH_FAILURE,
    payload: errMsg,
  };
};
