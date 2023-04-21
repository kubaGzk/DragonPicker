import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearLocalUser, finishGameAuth, login } from "../store/auth";
import LoginForm from "./LoginForm/LoginForm";
import UserQuestion from "./UserQuestion/UserQuestion";
import Modal from "./Modal/Modal";
import { addCoins, finishGameGameStatus, quitLevel } from "../store/gameStatus";
import GameMenu from "./GameMenu/GameMenu";
import {
    finishLoading,
    startLoading,
    turnMenuOff,
    turnSaveMenuOn,
    turnSaveMenuOff,
    closeLeaderboard,
    finishGameMenu,
} from "../store/menu";
import Loader from "./Loader/Loader";
import BoardQuestion from "./BoardQuestion/BoardQuestion";
import Leaderboard from "./Leaderboard/Leaderboard";

interface FormProps {
    assetLoading: boolean;
}

const Menu: FunctionComponent<FormProps> = (props) => {
    const { assetLoading } = props;

    const {
        isAuth,
        localUsername,
        localCoins,
        hasLocalUser,
        menuOn,
        levelSelected,
        saveMenuOn,
        leaderboard,
        leaderboardError,
        leaderboardOn,
        leaderboardLoading,
        endingGame,
    } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
        ...state.gameStatus,
    }));

    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    const loginHandler = () => {
        if (!nameError && nameTouched) {
            dispatch(login({ username }));
            dispatch(addCoins({ coins: 1000 }));
        }
    };

    const usernameInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const pattern = /^[a-zA-Z0-9_.-]{1,10}$/;
        const result = !pattern.test(e.currentTarget.value);
        setNameError(result);
        setUsername(e.currentTarget.value);
        setNameTouched(true);
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

    const closeMenuHandler = () => {
        dispatch(turnMenuOff());
    };

    const levelMenuHandler = () => {
        dispatch(turnMenuOff());
        dispatch(quitLevel());
    };

    const saveMenuHandler = () => {
        dispatch(turnSaveMenuOn());
    };

    const saveScoreHandler = () => {
        dispatch(startLoading({ endingGame: true }));
        setTimeout(() => {
            dispatch(finishLoading({ leaderboard: [] }));
        }, 3000);
    };

    const continueSaveGameHandler = () => {
        dispatch(turnSaveMenuOff());
    };

    const openLeaderboardHandler = () => {
        dispatch(startLoading({}));
        setTimeout(() => {
            dispatch(finishLoading({ leaderboard: [] }));
        }, 3000);
    };

    const endGameLeaderboardHandler = () => {
        dispatch(finishGameAuth());
        dispatch(finishGameGameStatus());
        dispatch(finishGameMenu());
    };

    const continueGameLeaderboardHandler = () => {
        dispatch(closeLeaderboard());
    };

    let menu = null;

    if (!isAuth && hasLocalUser) {
        menu = (
            <UserQuestion
                localUserHandler={localUserHandler}
                newUserHandler={clearLocalHandler}
            />
        );
    } else if (!isAuth) {
        menu = (
            <LoginForm
                usernameInputHandler={usernameInputHandler}
                loginHandler={loginHandler}
                nameError={nameError}
            />
        );
    } else if (menuOn) {
        menu = (
            <GameMenu
                closeMenuHandler={closeMenuHandler}
                levelMenuHandler={levelMenuHandler}
                saveMenuHandler={saveMenuHandler}
                openLeaderboardHandler={openLeaderboardHandler}
                levelSelected={levelSelected}
            />
        );
    } else if (saveMenuOn) {
        menu = (
            <BoardQuestion
                saveScore={saveScoreHandler}
                continueGame={continueSaveGameHandler}
            />
        );
    } else if (leaderboardLoading || assetLoading) {
        menu = <Loader />;
    } else if (leaderboardOn) {
        menu = (
            <Leaderboard
                leaderboardItems={leaderboard}
                endingGame={endingGame}
                continueGame={continueGameLeaderboardHandler}
                endGame={endGameLeaderboardHandler}
            />
        );
    }

    return menu && <Modal>{menu}</Modal>;
};

export default Menu;
