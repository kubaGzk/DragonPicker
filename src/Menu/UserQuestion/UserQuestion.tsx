import { FC } from "react";
import Button from "../Button/Button";
import classes from "./UserQuestion.module.css";

interface UserQuestionProps {
    localUserHandler: () => void;
    newUserHandler: () => void;
}

const UserQuestion: FC<UserQuestionProps> = (props) => {
    const { localUserHandler, newUserHandler } = props;

    return (
        <>
            <h2>
                Hey, we found user in history with some coins in the wallet. Do
                you want to use that account and continue game?
            </h2>
            <div className={classes.ButtonContainer}>
                <Button onClick={localUserHandler}>Yes</Button>
                <Button onClick={newUserHandler}>No</Button>
            </div>
        </>
    );
};

export default UserQuestion;
