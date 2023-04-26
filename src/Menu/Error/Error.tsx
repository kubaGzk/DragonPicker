import { FC } from "react";
import Button from "../Button/Button";
import classes from "./Leaderboard.module.css";

interface ErrorProps {
    confirmError: () => void;
}

const Error: FC<ErrorProps> = (props) => {
    const { confirmError } = props;

    return (
        <>
            <h2>Unexpected network error, please try again later.</h2>
            <Button onClick={confirmError}>OK</Button>
        </>
    );
};

export default Error;
