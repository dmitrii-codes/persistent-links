import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import Footer from "../components/Footer";
import { scrapeHistoryUrl } from "../config/endpoints";

const Browse = () => {
    const [src, setSrc] = React.useState<string>("");
    const [timestamp, setTimestamp] = React.useState<Date>();
    const [originalUrl, setOriginalUrl] = React.useState<string>("");
    const shortUrl = useLocation().pathname.substring(
        useLocation().pathname.lastIndexOf("/") + 1
    );

    React.useEffect(() => {
        axios(`${scrapeHistoryUrl}/scrape?surl=${shortUrl}`)
            .then((result) => {
                if (result.status === 200) {
                    const permaLink: {
                        content_path: string;
                        timestamp: string;
                        url: string;
                    } = result.data?.data?.[0];
                    setSrc(permaLink.content_path);
                    setTimestamp(new Date(permaLink.timestamp));
                    setOriginalUrl(permaLink.url);
                }
            })
            .catch((error) => alert(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavigationBar
                activePage={NavBarPage.Browse}
                text={`${originalUrl} | Archived on: ${timestamp?.toLocaleString()}`}
            />
            <iframe
                title="Scrapped"
                src={src}
                style={{
                    position: "inherit",
                    top: "0",
                    left: "0",
                    bottom: "0",
                    right: "0",
                    width: "100%",
                    height: "calc(100vh - 94px)",
                    border: "none",
                    margin: "0",
                    padding: "0",
                    overflow: "hidden",
                    opacity: "0.9",
                    background: "white",
                }}
            ></iframe>
            <Footer />
        </div>
    );
};

export default Browse;
