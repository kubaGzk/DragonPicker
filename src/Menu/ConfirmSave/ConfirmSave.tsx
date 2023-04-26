import { FC } from "react";
import Button from "../Button/Button";

interface ConfirmSaveProps {
    showLeaderboard: () => void;
}

const ConfirmSave: FC<ConfirmSaveProps> = (props) => {
    const { showLeaderboard } = props;

    return (
        <>
            <h2>Your score has been succesfully saved.</h2>
            <Button onClick={showLeaderboard}>See the leaderboard</Button>
        </>
    );
};

export default ConfirmSave;
