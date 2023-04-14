import { Container, Text, Graphics } from "@pixi/react";
import { FC, useCallback, useMemo } from "react";
import Increaser from "./Increaser/Increaser";
import { CurrentStatus } from "../../../types";
import { gridElementStyle } from "../../../styles";

interface GridElementProps {
    minStake: number;
    maxStake: number;
    currValue: number;
    x: number;
    y: number;
    elWidth: number;
    elHeight: number;
    currentStatus: CurrentStatus;
    onIncrease: () => void;
    onDecrease: () => void;
    collectable: boolean;
    onCollect: () => void;
    levelSelected: number;
}

const GridElement: FC<GridElementProps> = (props) => {
    const {
        minStake,
        maxStake,
        currValue,
        currentStatus,
        x,
        y,
        elWidth,
        elHeight,
        onIncrease,
        onDecrease,
        collectable,
        onCollect,
        levelSelected,
    } = props;

    const fillColors: number[] = useMemo(
        () => [0xa25f4e, 0x485c4a, 0x5e5b3d],
        [],
    );

    const draw = useCallback(
        (g: any) => {
            g.clear();

            g.lineStyle(2, 0xcbc6af, 1);
            g.beginFill(
                collectable ? 0xfcee21 : fillColors[levelSelected - 1],
                0.6,
            );
            g.drawRoundedRect(0, 0, elWidth, elHeight, 15);
            g.endFill();
        },
        [elWidth, elHeight, collectable, fillColors, levelSelected],
    );

    const textStyle = gridElementStyle(elHeight, collectable);

    const increaserType =
        currentStatus === CurrentStatus.Play ||
        currentStatus === CurrentStatus.Collect
            ? "blocked"
            : minStake < currValue
            ? currValue < maxStake
                ? "regular"
                : "high"
            : "low";

    return (
        <Container x={x} y={y}>
            <Graphics
                draw={draw}
                interactive={collectable}
                onclick={onCollect}
            />

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
