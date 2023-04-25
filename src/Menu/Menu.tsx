import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector, useSounds } from "../hooks/hooks";
import { clearLocalUser, finishGameAuth, login } from "../store/auth";
import LoginForm from "./LoginForm/LoginForm";
import UserQuestion from "./UserQuestion/UserQuestion";
import Modal from "./Modal/Modal";
import { addCoins, finishGameGameStatus, quitLevel } from "../store/gameStatus";
import GameMenu from "./GameMenu/GameMenu";
import {
    turnMenuOff,
    turnSaveMenuOn,
    turnSaveMenuOff,
    closeLeaderboard,
    finishGameMenu,
    postScore,
    fetchLeaderboard,
    clearError,
} from "../store/menu";
import Loader from "./Loader/Loader";
import BoardQuestion from "./BoardQuestion/BoardQuestion";
import Leaderboard from "./Leaderboard/Leaderboard";
import Error from "./Error/Error";
import ConfirmSave from "./ConfirmSave/ConfirmSave";

interface FormProps {}

const Menu: FunctionComponent<FormProps> = () => {
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
        coins,
        username,
        confirmMenuOn,
        assetsLoaded,
    } = useAppSelector((state) => ({
        ...state.auth,
        ...state.menu,
        ...state.gameStatus,
    }));

    const dispatch = useAppDispatch();

    const { playClick } = useSounds();

    const [inputName, setInputName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    const loginHandler = () => {
        if (!nameError && nameTouched) {
            dispatch(login({ username: inputName }));
            dispatch(addCoins({ coins: 1000 }));
        }
    };

    const usernameInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const pattern = /^[a-zA-Z0-9_.-]{1,10}$/;
        const result = !pattern.test(e.currentTarget.value);
        setNameError(result);
        setInputName(e.currentTarget.value);
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
        playClick();
        dispatch(turnMenuOff());
    };

    const levelMenuHandler = () => {
        playClick();
        dispatch(turnMenuOff());
        dispatch(quitLevel());
    };

    const saveMenuHandler = () => {
        playClick();
        dispatch(turnSaveMenuOn());
    };

    const saveScoreHandler = () => {
        playClick();
        dispatch(postScore({ username, coins }));
    };

    const continueSaveGameHandler = () => {
        playClick();
        dispatch(turnSaveMenuOff());
    };

    const openLeaderboardHandler = () => {
        playClick();
        dispatch(fetchLeaderboard());
    };

    const endGameLeaderboardHandler = () => {
        playClick();
        dispatch(finishGameAuth());
        dispatch(finishGameGameStatus());
        dispatch(finishGameMenu());
    };

    const continueGameLeaderboardHandler = () => {
        playClick();
        dispatch(closeLeaderboard());
    };

    const confirmErrorHandler = () => {
        playClick();
        dispatch(clearError());
    };

    let menu = null;
    if (leaderboardLoading || !assetsLoaded) {
        menu = <Loader />;
    } else if (!isAuth && hasLocalUser) {
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
    } else if (leaderboardOn) {
        menu = (
            <Leaderboard
                leaderboardItems={leaderboard}
                endingGame={endingGame}
                continueGame={continueGameLeaderboardHandler}
                endGame={endGameLeaderboardHandler}
            />
        );
    } else if (leaderboardError) {
        menu = <Error confirmError={confirmErrorHandler} />;
    } else if (confirmMenuOn) {
        menu = <ConfirmSave showLeaderboard={openLeaderboardHandler} />;
    }

    return menu && <Modal>{menu}</Modal>;
};

export default Menu;
