import React from "react";
import LinkBox from "../components/LinkBox";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";

const Home = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.Home} />
            <div className="main-body">
                <LinkBox />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
