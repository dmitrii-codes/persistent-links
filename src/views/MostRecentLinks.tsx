import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import { Link } from "react-router-dom";
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { origin } from "../config/http";

// replace with real API
const testData: LinkItem[] = [
    {
        original: "coursera.org",
        stored: "/hashed1",
        date: Date.now(),
    },
    {
        original: "youtube.com",
        stored: "/hashed2",
        date: Date.now(),
    },
    {
        original: "facebook.com",
        stored: "/hashed3",
        date: Date.now(),
    },
    {
        original: "microsoft.com",
        stored: "/hashed4",
        date: Date.now(),
    },
    {
        original: "instagram.com",
        stored: "/hashed5",
        date: Date.now(),
    },
    {
        original: "twitter.com",
        stored: "/hashed6",
        date: Date.now(),
    },
    {
        original: "persistentlinks.org",
        stored: "/hashed7",
        date: Date.now(),
    },
    {
        original: "azure.com",
        stored: "/hashed8",
        date: Date.now(),
    },
    {
        original: "amazon.com",
        stored: "/hashed9",
        date: Date.now(),
    },
    {
        original: "ebay.com",
        stored: "/hashed10",
        date: Date.now(),
    },
];

interface LinkItem {
    original: string;
    stored: string;
    date: number;
}

const MostRecentLinks = () => {
    const [items, setItems] = React.useState<Array<LinkItem>>([]);
    const columns: IColumn[] = [
        {
            key: "original",
            name: "Original URL",
            minWidth: 200,
            maxWidth: 220,
            isResizable: true,
            onRender: (item: LinkItem) => (
                <Link to={item.original}>{item.original}</Link>
            ),
        },
        {
            key: "stored",
            name: "Stored URL",
            minWidth: 200,
            maxWidth: 220,
            isResizable: true,
            onRender: (item: LinkItem) => (
                <Link
                    to={`${origin}${item.stored}`}
                >{`${origin}${item.stored}`}</Link>
            ),
        },
        {
            key: "date",
            name: "Date",
            minWidth: 200,
            maxWidth: 220,
            isResizable: true,
            onRender: (item: LinkItem) => new Date(item.date).toLocaleString(),
        },
        {
            key: "copy",
            name: "Actions",
            minWidth: 200,
            isResizable: true,
            onRender: (_item, _index) => {
                return (
                    <>
                        <Link className="mr-2" to="">
                            copy
                        </Link>
                        <Link className="mr-2" to="">
                            share
                        </Link>
                        <Link to="">open</Link>
                    </>
                );
            },
        },
    ];

    React.useEffect(() => {
        // TODO: replace with API call
        Promise.resolve().then(() => {
            setItems(testData);
        });
    });

    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.MostRecent} />
            <DetailsList
                className={"recent-links"}
                compact={true}
                items={items}
                columns={columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
            />
        </div>
    );
};

export default MostRecentLinks;
