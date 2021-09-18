import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { ConfirmationPageProps } from "../views/CreateConfirmation";
import { useHistory } from "react-router-dom";
import { mainScrapperUrl } from "../config/endpoints";
import axios from "axios";
import { LinkSquare24Regular, Save24Regular} from "@fluentui/react-icons";

function isValidUrl(url: string): boolean {
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    return Array.isArray(url.match(new RegExp(expression)));
}

const LinkBox = () => {
    const [linkUrl, setLinkUrl] = React.useState("");
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

                    // TODO: add the loading indicator
                    if (isValidUrl(linkUrl)) {
                        setErrorMessage("");
                        // TODO: enable CORS
                        axios
                            .post(
                                `${mainScrapperUrl}/dev`,
                                {
                                    url: linkUrl,
                                }
                            )
                            .then((result) => {
                                console.log(result);
                                if (result.status === 200) {
                                    navigateToConfirmation(result.data);
                                } else {
                                    navigateToConfirmation("", result.statusText);
                                }
                            })
                            .catch((error) =>
                                navigateToConfirmation("", error.message)
                            );
                    } else {
                        setErrorMessage(
                            "The URL is invalid. Please verify your input."
                        );
                    }
                }}
            >
                <div className="link_input">
                    <TextField
                        className="linkbox"
                        value={linkUrl}
                        errorMessage={errorMessage}
                        onChange={(_, value) => {
                            errorMessage && isValidUrl(linkUrl) && setErrorMessage("");
                            setLinkUrl(value || "");
                        }}
                        placeholder="Enter website URL here..."
                        borderless
                    />
                    <LinkSquare24Regular className="mr-3 icons"></LinkSquare24Regular>
                </div>
                <div className="submitbutton">
                    <button type="submit" className="btn btn-primary">Generate PermaLink</button>
                </div>
            </form>

    );
};

export default LinkBox;
