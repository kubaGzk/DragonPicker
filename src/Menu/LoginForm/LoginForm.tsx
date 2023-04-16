import { FC } from "react";

import Button from "../Button/Button";
import classes from "./LoginForm.module.css";

interface LoginFormProps {
    usernameInputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
    loginHandler: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const { usernameInputHandler, loginHandler } = props;

    return (
        <>
            <h1>Please provide your Username</h1>
            <label htmlFor="fname">Username</label>
            <input
                type="text"
                id="fname"
                name="fname"
                onChange={usernameInputHandler}
            />

            <Button onClick={loginHandler}>Start game</Button>
        </>
    );
};

export default LoginForm;