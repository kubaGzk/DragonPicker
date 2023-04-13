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
        <div className={classes.UserQuestion}>
            <h2>
                Hey, we found user in history with some coins in the wallet. Do
                you want to use that account and continue game?
            </h2>
            <div>
                <Button onClick={localUserHandler}>Yes</Button>
                <Button onClick={newUserHandler}>
                    No, I want to start with new account
                </Button>
            </div>
        </div>
    );
};

export default UserQuestion;
