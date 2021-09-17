import React from "react";
import NavigationBar from "../components/NavigationBar";
import { NavBarPage } from "../components/NavigationBar";
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
            <div className="linkbox">
                <Label className={`${errorMessage && "text-danger"}`}>
                    {errorMessage ||
                        "The link was successfully preserved and now can be shared"}
                </Label>
                {!errorMessage && (
                    <TextField value={generatedUrl} readOnly></TextField>
                )}
                <DefaultButton
                    text={errorMessage ? "Try again" : "Copy"}
                    onClick={() => {
                        errorMessage ? history.push("/") : copyUrl();
                    }}
                />
            </div>
        </div>
    );
};

export default CreateConfirmation;