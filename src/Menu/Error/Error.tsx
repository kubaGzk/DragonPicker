import { FC } from "react";
import Button from "../Button/Button";

interface ErrorProps {
    confirmError: () => void;
    assetsError: boolean;
}

const Error: FC<ErrorProps> = (props) => {
    const { confirmError, assetsError } = props;

    const confirmErrorHandler = () => {
        if (assetsError) {
            window.location.reload();
        } else {
            confirmError();
        }
    };

    const errorMessage = assetsError ? (
        <h2>Game Assets cannot be loaded, please try again later.</h2>
    ) : (
        <h2>Unexpected network error, please try again later.</h2>
    );

    return (
        <>
            {errorMessage}
            <Button onClick={confirmErrorHandler}>OK</Button>
        </>
    );
};

export default Error;
