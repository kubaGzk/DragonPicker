import { FC } from "react";
import Button from "../Button/Button";

interface GameOverProps {
    startAgain: () => void;
}

const GameOver: FC<GameOverProps> = (props) => {
    const { startAgain } = props;

    return (
        <>
            <h2>Game Over - You lost your money</h2>
            <Button onClick={startAgain}>Start Again</Button>
        </>
    );
};

export default GameOver;
