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
}

const Map: FC<MapProps> = (props) => {
    const { width, height } = props;

    const { levelSelected, currentStatus } = useAppSelector(
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
        if (levelSelected && currentStatus === CurrentStatus.Start)
            dispatch(recalculateGrid({ width, height }));
    }, [width, height, dispatch, levelSelected, currentStatus]);

    return (
        <>
            <Grid />
            <GameControl
                currentStatus={currentStatus}
                width={width}
                height={height}
                startGame={startGameHandler}
                collectAll={collectAllWinHandler}
            />
        </>
    );
};

export default Map;
