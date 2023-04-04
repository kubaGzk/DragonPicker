import { FC, useEffect } from "react";

import Grid from "./Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { recalculateGrid } from "../../store/gameStatus";
import Dragon from "./Dragon/Dragon";
interface MapProps {
    width: number;
    height: number;
}

const Map: FC<MapProps> = (props) => {
    const { width, height } = props;

    const { levelSelected, gridElements } = useAppSelector(
        (state) => state.gameStatus,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelSelected) dispatch(recalculateGrid({ width, height }));
    }, [width, height, dispatch, levelSelected]);

    return (
        <>
            <Grid />
            <Dragon
                width={width}
                height={height}
                targetX={gridElements[0].x}
                targetY={gridElements[0].y}
            />
        </>
    );
};

export default Map;
