import { FC, useEffect } from "react";

import Grid from "./Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { recalculateGrid } from "../../store/gameStatus";
interface MapProps {
    width: number;
    height: number;
}

const Map: FC<MapProps> = (props) => {
    const { width, height } = props;

    const {
        levelSelected,
    } = useAppSelector((state) => state.gameStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelSelected) dispatch(recalculateGrid({ width, height }));
    }, [width, height, dispatch, levelSelected]);

    return (
        <>
            <Grid />
        </>
    );
};

export default Map;
