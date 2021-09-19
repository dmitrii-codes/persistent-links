import React from "react";
import { Link } from "react-router-dom";
import { FolderLink48Filled } from "@fluentui/react-icons";
import { Text } from "@fluentui/react/lib/Text";

export interface NavigationBarProps {
    activePage: NavBarPage;
    text?: string;
}

export enum NavBarPage {
    About,
    Browse,
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
                <FolderLink48Filled className="mr-3 navbar-icon"></FolderLink48Filled>
                <Link
                    className={`navbar-brand disable-select ${
                        props.activePage === NavBarPage.Home && "active"
                    }`}
                    to="/"
                >
                    PermaLink
                </Link>
                <button
                    className="navbar-toggler disable-select"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {props.activePage !== NavBarPage.Browse && (
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li
                                className={`nav-item ${
                                    props.activePage === NavBarPage.About &&
                                    "active"
                                }`}
                            >
                                <Link
                                    className="nav-link disable-select"
                                    to={"/about"}
                                >
                                    About
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    props.activePage ===
                                        NavBarPage.HowItWorks && "active"
                                }`}
                            >
                                <Link
                                    className="nav-link disable-select"
                                    to="/how-it-works"
                                >
                                    How It Works
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li
                                className={`nav-item ${
                                    props.activePage ===
                                        NavBarPage.MostRecent && "active"
                                }`}
                            >
                                <Link
                                    className="nav-link disable-select"
                                    to={"/most-recent"}
                                >
                                    Recent Links
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
                {props.activePage === NavBarPage.Browse && (
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-center nav-item">
                                <Text
                                    className="disable-select"
                                    style={{ fontWeight: 500 }}
                                >
                                    {props.text}
                                </Text>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link disable-select"
                                    to={"/most-recent"}
                                >
                                    Recent Links
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default NavigationBar;
