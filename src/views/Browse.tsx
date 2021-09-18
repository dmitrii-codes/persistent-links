import React from "react";
import { useLocation } from "react-router-dom";

const Browse = () => {
    return (
        <div>
            <span>{useLocation().pathname}</span>
            <iframe
                title="Scrapped"
                src="***REMOVED***httpsenwikipediaorgwikiAcamptonectes.html"
                width="800"
                height="600"
            ></iframe>
        </div>
    );
};

export default Browse;
