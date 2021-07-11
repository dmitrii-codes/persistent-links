import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";

const HowItWorks = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.HowItWorks} />
            <ul>
                <li>Step 1. Submit the link you would like to preserve.</li>
                <li>
                    Step 2. Copy a new generated link from the confirmation
                    page.
                </li>
                <li>
                    Step 3. The generated link will display the current snapshot
                    of the web page. Use it as needed.
                </li>
            </ul>
        </div>
    );
};

export default HowItWorks;
