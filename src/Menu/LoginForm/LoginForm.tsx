import { FC } from "react";

import Button from "../Button/Button";
import classes from "./LoginForm.module.css";

interface LoginFormProps {
    usernameInputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
    loginHandler: () => void;
    nameError: boolean;
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const { usernameInputHandler, loginHandler, nameError } = props;

    return (
        <div className={classes.LoginForm}>
            <h1>Please provide your Username</h1>
            <div className={classes.Input}>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    onChange={usernameInputHandler}
                />
            </div>

            <div className={classes.Error}>
                {nameError && (
                    <>
                        <span>Username can contain A-Z and 0-9 characters.</span>
                        <span>Minimum is 1 character and maximum is 10.</span>
                    </>
                )}
            </div>

            <Button onClick={loginHandler} disabled={nameError}>
                Start game
            </Button>
        </div>
    );
};

export default LoginForm;
