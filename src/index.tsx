import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import Home from "./views/Home";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import thunk from "redux-thunk";
import { initializeIcons } from "@uifabric/icons";
import "./index.scss";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    initializeIcons();
  }

  render(): JSX.Element {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
