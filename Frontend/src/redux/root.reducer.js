import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import houseReducer from "./house/house.reducer";
import wishlistReducer from "./wishlist/wishlist.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  house: houseReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
