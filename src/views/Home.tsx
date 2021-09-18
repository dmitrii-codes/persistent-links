import React from "react";
import LinkBox from "../components/LinkBox";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";


const Home = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.Home} />
            <div className="main_body">
                    <LinkBox />
            </div>
            <div className="footer">
                PermaLink was created for the UoL BSc Computer Science course CM2020: Agile Software Projects, by Team 6, Tutor Group 2 (J Batty, S Dattatreya, C Ojiba, I Sheresh, D Vasilev). All rights reserved.
            </div>
        </div>
    );
};

export default Home;
