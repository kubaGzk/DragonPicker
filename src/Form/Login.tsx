import { FunctionComponent, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { login } from "../store/auth";
import LoginForm from "./LoginForm/LoginForm";
import UserQuestion from "./UserQuestion/UserQuestion";

interface FormProps {
    localUser?: { username: string; coins: number };
    clearLocalUser: () => void;
}

const Form: FunctionComponent<FormProps> = (props) => {
    const { localUser, clearLocalUser } = props;

    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>("");

    const loginHandler = () => {
        dispatch(login({ username }));
    };

    const usernameInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    };

    const localUserHandler = () => {
        if (localUser && localUser.username.length > 0 && localUser.coins) {
            dispatch(login({ ...localUser }));
        }
    };
    const newUserHandler = () => {
        clearLocalUser();
    };

    let form = (
        <LoginForm
            usernameInputHandler={usernameInputHandler}
            loginHandler={loginHandler}
        />
    );

    if (localUser && localUser.username.length > 0) {
        form = (
            <UserQuestion
                localUserHandler={localUserHandler}
                newUserHandler={newUserHandler}
            />
        );
    }

    return form;
};

export default Form;
