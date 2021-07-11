import React from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { useHistory } from "react-router-dom";
import { ConfirmationPageProps } from "../views/CreateConfirmation";

const LinkBox = () => {
    const [LinkUrl, setLinkUrl] = React.useState("");
    const history = useHistory<ConfirmationPageProps>();

    const navigateToConfirmation = (
        generatedUrl: string,
        errorMessage?: string
    ) => history.push("/create-confirmation", { generatedUrl, errorMessage });

    return (
        <form
            className="linkbox"
            onSubmit={(event) => {
                // TODO: add validations
                event.preventDefault();
                Promise.resolve()
                    // TODO: call an api to scrape
                    .then(() => {
                        // on success
                        navigateToConfirmation(
                            "http://localhost:3000/scrappedandhashed"
                        );
                    })
                    .catch((error) => navigateToConfirmation("", error));
            }}
        >
            <TextField
                label={"Link to preserve:"}
                value={LinkUrl}
                onChange={(_, value) => setLinkUrl(value || "")}
                underlined
            />
        </form>
    );
};

export default LinkBox;
