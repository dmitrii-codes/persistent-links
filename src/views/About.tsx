import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import Footer from "../components/Footer";
import jonny from "../static/img/jonny.jpg";
import dmitrii from "../static/img/dmitrii.jpg";
import irina from "../static/img/irina.jpg";
import martin from "../static/img/martin.jpg";
import suhas from "../static/img/suhas.jpg";

const About = () => {
    return (
        <div className="about">
            <NavigationBar activePage={NavBarPage.About} />

            <div className="content">
                <h1 className="display-4">What is PermaLink?</h1>
                <p className="lead">
                    PermaLink aims to combat link decay and content drift by
                    creating a reliable, immutable, contemporaneous and
                    highly-citable record of online content.
                </p>
                <p>
                    The Internet is ephemeral. Every week, one link out of every
                    200 is broken. Over 20% of links cited in scientific
                    journals no longer point to the intended page. This number
                    is 70% for academic legal journals. These broken links give
                    rise to the problem of link decay or 'linkrot' and increase
                    the fragility of the Internet.
                </p>
                <p>
                    The decay of links leads to inconvenience and allows the
                    spread of misinformation or 'fake news'. The content
                    accessed via any link is <i>mutable</i>: it can be edited to
                    change its meaning (leading to 'content drift'), often
                    without any indication that changes have been made.
                    Malicious users may modify linked content (e.g. a Wikipedia
                    article) in a process called 'malicious editing'.
                </p>
                <p>
                    <i>PermaLink</i> allows users to share links that: user or
                    publisher to share a permanent, unchangable link that: (i)
                    will not fail over time, and (ii) provides an immutable
                    record of the content addressed by the link, at the time of
                    sharing.
                </p>
                <p className="lead">
                    This Progressive Web Application was designed and built as
                    part of the requirements of the CM2020 Agile Software
                    Projects course, as part of the University of London BSc in
                    Computer Science programme.
                </p>
            </div>

            <div className="content">
                <h1 className="display-4">Who designed PermaLink?</h1>
                <p className="lead">
                    We are a small group of BSc Computer Science students.
                </p>

                <div className="container-fluid">
                    <div className="row py-2">
                        <div className="col-auto">
                            <img
                                className="headshot"
                                src={suhas}
                                alt="Suhas Dattatreya"
                            />
                        </div>
                        <div className="col">
                            <p>Suhas Dattatreya</p>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-auto">
                            <img
                                className="headshot"
                                src={dmitrii}
                                alt="Dmitrii Vasilev"
                            />
                        </div>
                        <div className="col">
                            <p>Dmitrii Vasilev</p>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-auto">
                            <img
                                className="headshot"
                                src={irina}
                                alt="Irina Sheresh"
                            />
                        </div>
                        <div className="col">
                            <p>Irina Sheresh</p>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-auto">
                            <img
                                className="headshot"
                                src={jonny}
                                alt="Jonathan Batty"
                            />
                        </div>
                        <div className="col">
                            <p>Jonathan Batty</p>
                        </div>
                    </div>
                    <div className="row py-2">
                        <div className="col-auto">
                            <img
                                className="headshot"
                                src={martin}
                                alt="Chuka (Martin) Ojiba"
                            />
                        </div>
                        <div className="col">
                            <p>Chuka (Martin) Ojiba</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>

            <Footer />
        </div>
    );
};

export default About;
