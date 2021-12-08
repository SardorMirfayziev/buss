import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux'

import Axios from "axios";
import {store} from "./store/store";

Axios.defaults.baseURL = "http://207.154.202.191:8000/v1/";

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
