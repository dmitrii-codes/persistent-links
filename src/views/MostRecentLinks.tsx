import React from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import Footer from "../components/Footer";
import { scrapeHistoryUrl, origin } from "../config/endpoints";
import { Link } from "react-router-dom";
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { Text } from "@fluentui/react/lib/Text";
import { Callout, DirectionalHint } from "@fluentui/react/lib/Callout";
import { mergeStyleSets } from "@fluentui/merge-styles";
import { FontWeights } from "@fluentui/style-utilities";

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
    const [isCalloutVisible, setCalloutVisible] = React.useState<number>(-1);

    const styles = mergeStyleSets({
        callout: {
            width: 320,
            padding: "20px 24px",
        },
        title: {
            marginBottom: 12,
            fontWeight: FontWeights.semilight,
        },
        link: {
            display: "block",
            marginTop: 20,
        },
    });

    const showCallout = (item: LinkItem, index: number) => {
        const title = "Hey, I just archived the link! ";
        const message = `PermaLink made a record of the following website "${
            item.original
        }" in its original state on ${item.date.toLocaleString()}. Check it out at ${
            item.stored
        }.`;
        return (
            <Callout
                ariaLabelledBy="share callout"
                ariaDescribedBy="callout with sharable info"
                className={styles.callout}
                target={`#share-${index}`}
                isBeakVisible={true}
                beakWidth={10}
                onDismiss={() => setCalloutVisible(-1)}
                directionalHint={DirectionalHint.leftCenter}
                setInitialFocus
            >
                <Text
                    block
                    variant="xLarge"
                    className={styles.title}
                    id={`label-${index}`}
                >
                    {title}
                </Text>
                <Text block variant="small" id={`description-${index}`}>
                    {message}
                </Text>
                <Link
                    target="_blank"
                    to=""
                    className={styles.link}
                    onClick={(event) => {
                        event.preventDefault();
                        copy(title + message.replace(/<[^>]*>?/gm, ""));
                    }}
                >
                    Copy
                </Link>
            </Callout>
        );
    };

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
            minWidth: 300,
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
            onRender: (item: LinkItem, index: number | undefined) => {
                return (
                    <>
                        <Link
                            className="mr-2"
                            target="_blank"
                            to=""
                            onClick={(event) => {
                                event.preventDefault();
                                copy(item.stored);
                            }}
                        >
                            copy
                        </Link>
                        <Link
                            className="mr-2"
                            target="_blank"
                            to=""
                            id={`share-${index}`}
                            onClick={(event) => {
                                event.preventDefault();
                                setCalloutVisible(
                                    typeof index === "number" ? index : -1
                                );
                            }}
                        >
                            share
                            {isCalloutVisible === index &&
                                showCallout(item, index)}
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
                stored: `${origin}/saved/${linkItem.path}`,
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

            <div className="content">
                <Text className="mx-auto disable-select">
                    Below are the 100 sites most recently archived with
                    PermaLink
                </Text>
                <DetailsList
                    className={"recent-links"}
                    compact={true}
                    items={items}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}
                />
            </div>
            <Footer />
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
