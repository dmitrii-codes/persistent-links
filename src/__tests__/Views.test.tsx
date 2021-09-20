import { render, screen } from "@testing-library/react";
import React from "react";
import About from "../views/About";
import Browse from "../views/Browse";
import Home from "../views/Home";
import HowItWorks from "../views/HowItWorks";
import MostRecentLinks from "../views/MostRecentLinks";

describe("<About />", () => {
    it("Renders <About /> component correctly", () => {
        render(<About />);
        expect(screen.getByText("PermaLink")).toMatchSnapshot();
    });
});

describe("<Browse />", () => {
    it("Renders <Browse /> component correctly", () => {
        render(<Browse />);
        expect(screen.getByText("PermaLink")).toMatchSnapshot();
    });
});

describe("<Home />", () => {
    it("Renders <Home /> component correctly", () => {
        render(<Home />);
        expect(screen.getByText("PermaLink")).toMatchSnapshot();
    });
});

describe("<HowItWorks />", () => {
    it("Renders <HowItWorks /> component correctly", () => {
        render(<HowItWorks />);
        expect(screen.getByText("PermaLink")).toMatchSnapshot();
    });
});

describe("<MostRecentLinks />", () => {
    it("Renders <MostRecentLinks /> component correctly", () => {
        render(<MostRecentLinks />);
        expect(screen.getByText("PermaLink")).toMatchSnapshot();
    });
});
