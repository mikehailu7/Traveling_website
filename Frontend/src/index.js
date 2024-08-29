// Author: Mikias Hailu and yared tsgie
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// state managements
import axios from "axios";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// react webvituals
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://localhost:5440/api/v1/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
//report web vitals 
reportWebVitals();
