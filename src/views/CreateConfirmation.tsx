import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
import Footer from "../components/Footer";
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "@fluentui/react/lib/TextField";
import { Label } from "@fluentui/react/lib/Label";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useHistory } from "react-router-dom";
export interface ConfirmationPageProps {
    generatedUrl: string;
    errorMessage?: string;
}

const CreateConfirmation = (
    props: RouteComponentProps<{}, {}, ConfirmationPageProps>
) => {
    const { generatedUrl, errorMessage } = props.location.state;
    const history = useHistory();

    const copyUrl = () => navigator.clipboard.writeText(generatedUrl);

    return (
        <div className="home">
            <NavigationBar activePage={NavBarPage.Home} />
            <div className="main-body">
                <div className="content">
                    <div className="linkbox disable-select">
                        <Label
                            className={`disable-select ${
                                errorMessage && "text-danger"
                            }`}
                        >
                            {errorMessage ||
                                "The link was successfully preserved and now can be shared"}
                        </Label>
                        {!errorMessage && (
                            <TextField
                                value={generatedUrl}
                                readOnly
                            ></TextField>
                        )}
                        <div className="copy-button">
                            <DefaultButton
                                className="btn btn-primary"
                                text={errorMessage ? "Try again" : "Copy"}
                                onClick={() => {
                                    errorMessage
                                        ? history.push("/")
                                        : copyUrl();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateConfirmation;
