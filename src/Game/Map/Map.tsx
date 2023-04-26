import { FC, useEffect } from "react";
import Grid from "./Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
    collectAllWinElements,
    recalculateGrid,
    startGame,
} from "../../store/gameStatus";
import GameControl from "./GameControl/GameControl";
import { CurrentStatus } from "../../types";

interface MapProps {
    width: number;
    height: number;
    scale: number;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const Map: FC<MapProps> = (props) => {
    const {
        width,
        height,
        scale,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    const { levelSelected, currentStatus, totalWin } = useAppSelector(
        (state) => state.gameStatus,
    );

    const dispatch = useAppDispatch();

    const startGameHandler = () => {
        dispatch(startGame());
    };

    const collectAllWinHandler = () => {
        dispatch(collectAllWinElements());
    };

    useEffect(() => {
        if (levelSelected && currentStatus !== CurrentStatus.Play)
            dispatch(recalculateGrid({ scale }));
    }, [scale, dispatch, levelSelected, currentStatus]);

    return (
        <>
            <Grid
                scale={scale}
                turnPointerOnHandler={turnPointerOnHandler}
                turnPointerOffHandler={turnPointerOffHandler}
            />
            <GameControl
                currentStatus={currentStatus}
                width={width}
                height={height}
                startGame={startGameHandler}
                collectAll={collectAllWinHandler}
                totalWin={totalWin}
                scale={scale}
                turnPointerOnHandler={turnPointerOnHandler}
                turnPointerOffHandler={turnPointerOffHandler}
            />
        </>
    );
};

export default Map;
