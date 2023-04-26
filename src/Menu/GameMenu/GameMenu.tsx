import { FC } from "react";
import classes from "./GameMenu.module.css";

interface GameMenuProps {
    closeMenuHandler: () => void;
    levelMenuHandler: () => void;
    saveMenuHandler: () => void;
    openLeaderboardHandler: () => void;
    levelSelected: number;
}

const GameMenu: FC<GameMenuProps> = (props) => {
    const {
        closeMenuHandler,
        levelMenuHandler,
        saveMenuHandler,
        openLeaderboardHandler,
        levelSelected,
    } = props;

    return (
        <div className={classes.GameMenu}>
            <ul>
                <li onClick={closeMenuHandler}> Continue Game</li>
                <li onClick={saveMenuHandler}>
                    Save your score on leaderboard
                </li>
                <li onClick={openLeaderboardHandler}> Show Leaderboard</li>
                {levelSelected > 0 && (
                    <li onClick={levelMenuHandler}>Go to Level menu</li>
                )}
            </ul>
        </div>
    );
};

export default GameMenu;
