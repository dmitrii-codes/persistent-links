import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./views/Home";
import About from "./views/About";
import MostRecentLinks from "./views/MostRecentLinks";
import CreateConfirmation from "./views/CreateConfirmation";
import HowItWorks from "./views/HowItWorks";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.scss";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Home}></Route>
                <Route
                    path="/how-it-works"
                    exact
                    component={HowItWorks}
                ></Route>
                <Route path="/about" exact component={About}></Route>
                <Route
                    path="/most-recent"
                    exact
                    component={MostRecentLinks}
                ></Route>
                <Route
                    path="/create-confirmation"
                    exact
                    component={CreateConfirmation}
                ></Route>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
