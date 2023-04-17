import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearLocalUser, login } from "../store/auth";
import LoginForm from "./LoginForm/LoginForm";
import UserQuestion from "./UserQuestion/UserQuestion";
import Modal from "./Modal/Modal";
import { addCoins } from "../store/gameStatus";
import GameMenu from "./GameMenu/GameMenu";
import { withOverlay } from "../Overlay/withOverlay";

interface FormProps {}

const Menu: FunctionComponent<FormProps> = (props) => {
    const { isAuth, localUsername, localCoins, hasLocalUser, menuOn } =
        useAppSelector((state) => ({ ...state.auth, ...state.menu }));

    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>("");

    const loginHandler = () => {
        dispatch(login({ username }));
        dispatch(addCoins({ coins: 1000 }));
    };

    const usernameInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    };

    const localUserHandler = () => {
        if (hasLocalUser) {
            dispatch(login({ username: localUsername }));
            dispatch(addCoins({ coins: localCoins }));
        }
    };

    const clearLocalHandler = () => {
        dispatch(clearLocalUser());
    };

    const ModalWithOverlay = withOverlay(Modal);

    let menu = null;

    if (!isAuth && hasLocalUser) {
        menu = (
            <ModalWithOverlay>
                <UserQuestion
                    localUserHandler={localUserHandler}
                    newUserHandler={clearLocalHandler}
                />
            </ModalWithOverlay>
        );
    } else if (!isAuth) {
        menu = (
            <ModalWithOverlay>
                <LoginForm
                    usernameInputHandler={usernameInputHandler}
                    loginHandler={loginHandler}
                />
            </ModalWithOverlay>
        );
    } else if (menuOn) {
        menu = (
            <ModalWithOverlay>
                <GameMenu />
            </ModalWithOverlay>
        );
    }

    return menu;
};

export default Menu;
