import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import persistedReducer from "./root.reducer";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleWares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middleWares));
const persistor = persistStore(store);

//run saga middlewares
sagaMiddleware.run(rootSaga);

export { store, persistor };
