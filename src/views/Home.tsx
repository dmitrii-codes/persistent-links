import React from "react";
import LinkBox from "../components/LinkBox";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import { LinkSquare24Regular, Save24Regular} from "@fluentui/react-icons";

const Home = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.Home} />
            <div className="main_body">
                <div className="link_input">
                    <LinkBox />
                    <LinkSquare24Regular className="mr-3 icons"></LinkSquare24Regular>
                </div>
            </div>
        </div>
    );
};

export default Home;
