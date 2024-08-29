import { takeLatest, call, put, all } from "redux-saga/effects";
import houseActionTypes from "./houseAction.types";
import {
  fetchTrendingHouses,
  fetchCategoryHouses,
  getHousesByCategory,
} from "../../backend-utils/houses-utils";
import {
  onTrendingFetchSuccess,
  onTrendingFetchFailure,
  onCategoryFetchSuccess,
  onCategoryFetchFailure,
  onCategoryHouseFetchSuccess,
  onCategoryHouseFetchFailure,
} from "./houseAction.creators";

/**
 * category with houses fetch sagas
 */

export function* fetchCategory({ payload: { limit } }) {
  try {
    const categoryData = yield call(fetchCategoryHouses, limit);
    if (categoryData.error) throw new Error(categoryData.error);
    yield put(onCategoryFetchSuccess(categoryData.categoryHouses));
  } catch (error) {
    yield put(onCategoryFetchFailure(error.message));
  }
}

export function* onCategoryFetchStart() {
  yield takeLatest(houseActionTypes.CATEGORY_FETCH_START, fetchCategory);
}

/**
 * trending houses fetch sagas
 */

export function* fetchTrending() {
  try {
    const trendingHouses = yield call(fetchTrendingHouses);
    if (trendingHouses.error) throw new Error(trendingHouses.error);
    yield put(onTrendingFetchSuccess(trendingHouses.houses));
  } catch (error) {
    yield put(onTrendingFetchFailure(error.message));
  }
}

export function* onTrendingFetchStart() {
  yield takeLatest(houseActionTypes.TRENDING_FETCH_START, fetchTrending);
}

/**
 * trending houses fetch sagas
 */

export function* fetchHousesPerCategory({ payload }) {
  try {
    const houseData = yield call(getHousesByCategory, payload);
    if (houseData.error) throw new Error(houseData.error);

    yield put(onCategoryHouseFetchSuccess(houseData.houses));
  } catch (error) {
    yield put(onCategoryHouseFetchFailure(error.message));
  }
}

export function* onFetchHousesPerCategory() {
  yield takeLatest(houseActionTypes.HOUSES_FETCH_START, fetchHousesPerCategory);
}

/**
 * General house sagas
 */

export default function* houseSaga() {
  yield all([
    call(onTrendingFetchStart),
    call(onCategoryFetchStart),
    call(onFetchHousesPerCategory),
  ]);
}
