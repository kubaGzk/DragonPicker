import { FC, useEffect } from "react";

import Grid from "./Grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { recalculateGrid, startGame } from "../../store/gameStatus";
import Dragon from "./Dragon/Dragon";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
interface MapProps {
    width: number;
    height: number;
}

const Map: FC<MapProps> = (props) => {
    const { width, height } = props;

    const { levelSelected, gridElements, gridElHeight, inPlay, winnersPosition } =
        useAppSelector((state) => state.gameStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (levelSelected) dispatch(recalculateGrid({ width, height }));
    }, [width, height, dispatch, levelSelected]);

    const startStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 20,
        fontWeight: "900",
        fill: ["#ffffff", "#FCEE21"], // gradient
        stroke: "#c8a11fe6",
        strokeThickness: 5,
        letterSpacing: 10,
        dropShadow: true,
        dropShadowColor: "#444a57",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    return (
        <>
            <Grid />
            {inPlay ? (
                <Dragon
                    width={width}
                    height={height}
                />
            ) : (
                <Text
                    text={"Start Game"}
                    style={startStyle}
                    x={width * 0.8}
                    y={height / 2}
                    width={150}
                    interactive={true}
                    onclick={() => dispatch(startGame())}
                />
            )}
        </>
    );
};

export default Map;
