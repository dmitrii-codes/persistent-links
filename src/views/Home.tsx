import React from "react";
import NavigationBar from "../components/NavigationBar";

class Home extends React.Component {
    public render() {
        return (
            <div className="home">
                <NavigationBar></NavigationBar>
                <h1>Welcome to Persistent Links</h1>
                <h4>Under Development...</h4>
            </div>
        );
    }
}

export default Home;
