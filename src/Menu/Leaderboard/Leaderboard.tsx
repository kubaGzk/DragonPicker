import { FC } from "react";
import Button from "../Button/Button";
import classes from "./Leaderboard.module.css";
import { LeaderboardItem } from "../../types";

interface LeaderboardProps {
    leaderboardItems: LeaderboardItem[];
    endingGame: boolean;
    continueGame: () => void;
    endGame: () => void;
}

const Leaderboard: FC<LeaderboardProps> = (props) => {
    const { leaderboardItems, endingGame, continueGame, endGame } = props;

    return (
        <>
            <table className={classes.LeaderboardTable}>
                <th>Position</th>
                <th>Username</th>
                <th>Coins</th>
                {leaderboardItems.map((item) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.coins}</td>
                        </tr>
                    );
                })}
            </table>

            {endingGame ? (
                <Button onClick={endGame}>End game</Button>
            ) : (
                <Button onClick={continueGame}>Return to Menu</Button>
            )}
        </>
    );
};

export default Leaderboard;
