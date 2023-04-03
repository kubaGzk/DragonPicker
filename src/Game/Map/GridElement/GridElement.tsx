import { Container, Text, Graphics } from "@pixi/react";
import { FC, useCallback } from "react";

import { TextStyle } from "pixi.js";
import Increaser from "./Increaser/Increaser";

interface GridElementProps {
    minStake: number;
    maxStake: number;
    currValue: number;
    x: number;
    y: number;
    elWidth: number;
    elHeight: number;
    inPlay: boolean;
    onIncrease: () => void;
    onDecrease: () => void;
}

const GridElement: FC<GridElementProps> = (props) => {
    const {
        minStake,
        maxStake,
        currValue,
        x,
        y,
        elWidth,
        elHeight,
        onIncrease,
        onDecrease,
    } = props;

    const draw = useCallback(
        (g: any) => {
            g.clear();

            g.lineStyle(2, 0xff00bb, 1);
            g.beginFill(0xff00bb, 0.25);
            g.drawRoundedRect(0, 0, elWidth, elHeight, 15);
            g.endFill();
        },
        [elWidth, elHeight],
    );

    const textStyle = new TextStyle({
        align: "center",
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: elHeight * 0.45,
        fontWeight: "400",
        fill: ["#ffffff", "#00ff99"], // gradient
        stroke: "#01d27e",
        strokeThickness: 2,
        letterSpacing: 8,
        dropShadow: true,
        dropShadowColor: "#ccced2",
        dropShadowBlur: 6,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 4,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    const increaserType =
        minStake < currValue
            ? currValue < maxStake
                ? "regular"
                : "high"
            : "low";

    return (
        <Container x={x} y={y}>
            <Graphics draw={draw} />

            <Increaser
                x={elWidth * 0.9}
                y={elHeight / 2}
                width={elHeight / 2}
                height={elHeight}
                type={increaserType}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
            />
            <Text
                text={currValue.toString()}
                style={textStyle}
                x={2}
                y={0.2 * elHeight}
                anchor={0}
            />
        </Container>
    );
};

export default GridElement;
