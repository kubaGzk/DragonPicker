import { FunctionComponent } from "react";

import Button from "../Button/Button";
import classes from "./LoginForm.module.css";

interface LoginFormProps {
    usernameInputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
    loginHandler: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
    const { usernameInputHandler, loginHandler } = props;

    return (
        <div className={classes.LoginForm}>
            <h1>Please provide your Username</h1>
            <label htmlFor="fname">Username</label>
            <input
                type="text"
                id="fname"
                name="fname"
                onChange={usernameInputHandler}
            />

            <Button onClick={loginHandler}>Start game</Button>
        </div>
    );
};

export default LoginForm;
