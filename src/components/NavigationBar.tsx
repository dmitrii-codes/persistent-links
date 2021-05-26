import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../static/icons/logo.svg";

class NavigationBar extends React.Component {
    render(): JSX.Element {
        return (
            <header>
                <nav
                    className="navbar navbar-expand-lg navbar-light"
                    style={{ backgroundColor: "#aaaaaa" }}
                >
                    <Logo
                        width="40px"
                        height="30px"
                        style={{ marginRight: "10px" }}
                    />
                    <Link className="navbar-brand" to="/">
                        Persistent Links
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/howitworks">
                                    How It Works
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to={"/about"}>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default NavigationBar;
