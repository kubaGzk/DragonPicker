import { FC } from "react";
import Button from "../Button/Button";
import classes from "./BoardQuestion.module.css";

interface BoardQuestionProps {
    saveScore: () => void;
    continueGame: () => void;
}

const BoardQuestion: FC<BoardQuestionProps> = (props) => {
    const { saveScore, continueGame } = props;

    return (
        <>
            <h2>
                Once you save your score on leaderboard game will end. Are you
                sure?
            </h2>
            <div className={classes.ButtonContainer}>
                <Button onClick={saveScore}>Yes</Button>
                <Button onClick={continueGame}>No</Button>
            </div>
        </>
    );
};

export default BoardQuestion;
