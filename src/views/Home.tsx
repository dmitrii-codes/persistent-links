import React from "react";
import LinkBox from "../components/LinkBox";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";

const Home = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.Home} />
            <LinkBox />
        </div>
    );
};

export default Home;
