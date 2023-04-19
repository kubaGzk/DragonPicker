import { FC } from "react";
import classes from "./GameMenu.module.css";

interface GameMenuProps {
    closeMenuHandler: () => void;
    levelMenuHandler: () => void;
    levelSelected: number;
}

const GameMenu: FC<GameMenuProps> = (props) => {
    const { closeMenuHandler, levelMenuHandler, levelSelected } = props;

    return (
        <div className={classes.GameMenu}>
            <ul>
                <li onClick={closeMenuHandler}> Continue Game</li>
                <li> Save your score on leaderboard</li>
                <li> Show Leaderboard</li>
                {levelSelected > 0 && (
                    <li onClick={levelMenuHandler}>Go to Level menu</li>
                )}
            </ul>
        </div>
    );
};

export default GameMenu;
