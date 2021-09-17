import React from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import { scrapeHistoryUrl } from "../config/endpoints";
import { Link } from "react-router-dom";
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { Text } from "@fluentui/react/lib/Text";

interface ScrapeHistoryPayload {
    data: {
        id: number;
        path: string;
        timestamp: number;
        url: string;
    }[];
}

interface LinkItem {
    original: string;
    stored: string;
    date: Date;
    id: number;
}

const MostRecentLinks = () => {
    const fetchedItems: LinkItem[] = [];
    const [items, setItems] = React.useState<Array<LinkItem>>([]);

    const fetchLinks = (url: string, pagination: boolean) => {
        axios(url).then((result) => {
            console.log(result);
            if (result.status === 200) {
                const payload: {
                    data: any[];
                    pagination: { current: number; nextPage?: string };
                } = result.data;
                processListPayload(payload, pagination);
                // recursive pagination, load first 100 only
                if (
                    payload.pagination.current < 6 &&
                    payload.pagination.nextPage
                ) {
                    fetchLinks(
                        `${scrapeHistoryUrl}${payload.pagination.nextPage}`,
                        true
                    );
                }
            }
        });
    };

    React.useEffect(() => {
        fetchLinks(`${scrapeHistoryUrl}/scrape`, false);
    }, []);

    const columns: IColumn[] = [
        {
            key: "original",
            name: "Original URL",
            flexGrow: 1,
            minWidth: 250,
            isResizable: true,
            onRender: (item: LinkItem) => (
                <Link to={item.original}>{item.original}</Link>
            ),
        },
        {
            key: "stored",
            name: "Stored URL",
            flexGrow: 1,
            minWidth: 250,
            isResizable: true,
            onRender: (item: LinkItem) => (
                <Link to={item.stored}>{item.stored}</Link>
            ),
        },
        {
            key: "date",
            name: "Date",
            flexGrow: 1,
            minWidth: 200,
            isResizable: true,
            onRender: (item: LinkItem) => new Date(item.date).toLocaleString(),
        },
        {
            key: "copy",
            name: "Actions",
            flexGrow: 1,
            minWidth: 200,
            isResizable: true,
            onRender: (item: LinkItem, _index) => {
                return (
                    <>
                        <Link
                            className="mr-2"
                            to=""
                            onClick={(event) => {
                                event.preventDefault();
                                copy(item.stored);
                            }}
                        >
                            copy
                        </Link>
                        {
                            // TODO: finish share
                        }
                        <Link className="mr-2" to="">
                            share
                        </Link>
                        <Link to={{ pathname: item.stored }} target="_blank">
                            open
                        </Link>
                    </>
                );
            },
        },
    ];

    const processListPayload = (
        linkItems: ScrapeHistoryPayload,
        pagination: boolean
    ) => {
        const listLink: LinkItem[] = [];

        linkItems?.data.forEach((linkItem) => {
            listLink.push({
                id: linkItem.id,
                date: new Date(linkItem.timestamp),
                original: linkItem.url,
                stored: linkItem.path,
            });
        });

        if (!pagination) {
            fetchedItems.length = 0;
        }
        fetchedItems.push(...listLink);
        setItems([...fetchedItems]);
    };

    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.MostRecent} />
            <Text className="mx-auto">100 most recent requests</Text>
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

function copy(text: string) {
    var input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
}

export default MostRecentLinks;
