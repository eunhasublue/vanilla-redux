import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./routes/Home";

// index.js 에서 App.js를 store에 연결할 것임
// store.js를 Global하게 사용할 것이기 때문에 최상위 컴포넌트인 <App> 컴포넌트에 <Provider>로 Wrapping 한다.
ReactDOM.render(
  // store.js에서 온 것임
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
