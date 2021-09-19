import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./views/Home";
import About from "./views/About";
import MostRecentLinks from "./views/MostRecentLinks";
import CreateConfirmation from "./views/CreateConfirmation";
import HowItWorks from "./views/HowItWorks";
import Browse from "./views/Browse";
import { BrowserRouter, Route } from "react-router-dom";
import { loadTheme } from "@fluentui/react/lib";
import "./index.scss";

const App = () => {
    loadTheme({
        palette: {
            themePrimary: "#0078d4",
            themeLighterAlt: "#eff6fc",
            themeLighter: "#deecf9",
            themeLight: "#c7e0f4",
            themeTertiary: "#71afe5",
            themeSecondary: "#2b88d8",
            themeDarkAlt: "#106ebe",
            themeDark: "#005a9e",
            themeDarker: "#004578",
            neutralLighterAlt: "#f8f8f8",
            neutralLighter: "#f4f4f4",
            neutralLight: "#eaeaea",
            neutralQuaternaryAlt: "#dadada",
            neutralQuaternary: "#d0d0d0",
            neutralTertiaryAlt: "#c8c8c8",
            neutralTertiary: "#c2c2c2",
            neutralSecondary: "#858585",
            neutralPrimaryAlt: "#4b4b4b",
            neutralPrimary: "#333333",
            neutralDark: "#272727",
            black: "#1d1d1d",
            white: "#ffffff",
        },
    });

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
                <Route path="/saved" component={Browse}></Route>
            </div>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
