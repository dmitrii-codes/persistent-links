import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";

const About = () => {
    return (
        <div className="about">
            <NavigationBar activePage={NavBarPage.About} />
            <h1>Who we are</h1>
            <p>We are a small group of student working on this project.</p>
            <i>
                Team members: Jonathan Batty, Suhas Dattatreya, Chuka Ojiba,
                Irina Sheresh, Dmitrii Vasilev.
            </i>
            <h1>What is this project</h1>
            <p>
                This project aims at combating link decay and content drift with
                a progressive web application (PWA) that creates a reliable,
                immutable, contemporaneous and highly-citable record of online
                content.
            </p>
        </div>
    );
};

export default About;
