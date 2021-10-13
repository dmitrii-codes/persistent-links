import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { ConfirmationPageProps } from "../views/CreateConfirmation";
import { useHistory } from "react-router-dom";
import { mainScrapperUrl, origin } from "../config/endpoints";
import axios from "axios";
import { LinkSquare24Regular } from "@fluentui/react-icons";

function isValidUrl(url: string): boolean {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    return Array.isArray(url.match(new RegExp(expression)));
}

const LinkBox = () => {
    const [linkUrl, setLinkUrl] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const history = useHistory<ConfirmationPageProps>();
    const navigateToConfirmation = (
        generatedUrl: string,
        errorMessage?: string
    ) => history.push("/create-confirmation", { generatedUrl, errorMessage });

    return (
        <form
            className="linkbox"
            onSubmit={(event) => {
                event.preventDefault();
                if (isValidUrl(linkUrl)) {
                    setErrorMessage("");
                    setLoading(true);
                    axios
                        .post<{ data: { url: string }; errorMessage?: string }>(
                            `${mainScrapperUrl}/dev`,
                            {
                                url: linkUrl,
                            }
                        )
                        .then((result) => {
                            setLoading(false);
                            console.log(result);
                            // fix the api that might return an error along with 200 OK
                            if (result.status === 200) {
                                if (!result.data?.errorMessage) {
                                    navigateToConfirmation(
                                        `${origin}/saved/${result.data.data.url}`
                                    );
                                } else {
                                    navigateToConfirmation(
                                        "",
                                        result.data?.errorMessage ||
                                            "Unknown error. Please try again later."
                                    );
                                }
                            } else {
                                navigateToConfirmation("", result.statusText);
                            }
                        })
                        .catch((error) =>
                            navigateToConfirmation("", error.message)
                        );
                } else {
                    setErrorMessage(
                        "The URL is invalid. Make sure you include the protocol."
                    );
                }
            }}
        >
            {loading ? (
                <div className="lds-ripple disable-select">
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <div className="link-input disable-select">
                    <TextField
                        className="linkbox col-"
                        value={linkUrl}
                        errorMessage={errorMessage}
                        onChange={(_, value) => {
                            errorMessage &&
                                isValidUrl(linkUrl) &&
                                setErrorMessage("");
                            setLinkUrl(value || "");
                        }}
                        underlined
                        placeholder={"https://www.permalinks.org/"}
                        borderless
                    />
                    <LinkSquare24Regular className="mr-3 icons hide"></LinkSquare24Regular>
                    <div className="submit-button">
                        <button type="submit" className="btn btn-primary">
                            Generate PermaLink
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default LinkBox;
