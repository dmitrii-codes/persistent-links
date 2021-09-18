import React from "react";
import { Link } from "react-router-dom";
import { FolderLink48Filled } from "@fluentui/react-icons";

export interface NavigationBarProps {
    activePage: NavBarPage;
}

export enum NavBarPage {
    About,
    Home,
    HowItWorks,
    MostRecent,
}

const NavigationBar = (props: NavigationBarProps) => {
    return (
        <header>
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                <FolderLink48Filled className="mr-3 navbar_icon"></FolderLink48Filled>
                <Link
                    className={`navbar-brand ${
                        props.activePage === NavBarPage.Home && "active"
                    }`}
                    to="/"
                >
                    PermaLink
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
                        <li
                            className={`nav-item ${
                                props.activePage === NavBarPage.About &&
                                "active"
                            }`}
                        >
                            <Link className="nav-link" to={"/about"}>
                                About
                            </Link>
                        </li>
                        <li
                            className={`nav-item ${
                                props.activePage === NavBarPage.HowItWorks &&
                                "active"
                            }`}
                        >
                            <Link className="nav-link" to="/how-it-works">
                                How It Works
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li
                            className={`nav-item ${
                                props.activePage === NavBarPage.MostRecent &&
                                "active"
                            }`}
                        >
                            <Link className="nav-link" to={"/most-recent"}>
                                Recent Links
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
