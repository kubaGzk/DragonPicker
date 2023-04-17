import { FC } from "react";
import classes from "./GameMenu.module.css"

interface GameMenuProps {}

const GameMenu: FC<GameMenuProps> = () => {
    return (
        <div className={classes.GameMenu}>
            <ul>
                <li> Continue Game</li>
                <li> Save your score on leaderboard</li>
                <li> Show Leaderboard</li>
                <li>Go to Level menu</li>
            </ul>
        </div>
    );
};

export default GameMenu;
