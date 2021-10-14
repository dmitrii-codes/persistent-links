import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import Footer from "../components/Footer";
import step1a from "../static/img/step1a.png";
import step1b from "../static/img/step1b.png";
import step2 from "../static/img/step2.png";
import step3 from "../static/img/step3.png";

const HowItWorks = () => {
    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.HowItWorks} />
            <div className="content">
                <div>
                    <h1 className="display-4">How to share a PermaLink</h1>
                    <p className="lead">
                        Share a permanent link in 3 easy steps...
                    </p>
                </div>
                <div className="py-2">
                    <p>
                        <b>Step 1:</b> Copy and paste the URL for the website
                        into the input box on the PermaLink home page, and click
                        "Generate PermaLink".
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <img
                                    className="responsive-image"
                                    src={step1a}
                                    alt="step 1a"
                                />
                            </div>
                            <div className="col">
                                <img
                                    className="responsive-image"
                                    src={step1b}
                                    alt="step 1b"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-2">
                    <p>
                        <b>Step 2:</b> A permanent, unchangable URL is
                        generated: this is the Permalink! Hit 'copy' to copy
                        this to the clipboard, and share.
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <img
                                    className="responsive-image"
                                    src={step2}
                                    alt="step2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-2">
                    <p>
                        <b>Step 3:</b> When the PermaLink is accessed, it will
                        retrieve the archived page, complete with the timestamp
                        at which the link was archived.
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <img
                                    className="responsive-image"
                                    src={step3}
                                    alt="step 3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HowItWorks;
