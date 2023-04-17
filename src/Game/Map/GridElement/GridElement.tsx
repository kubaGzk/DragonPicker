import { Container, Text, Graphics } from "@pixi/react";
import { FC, useCallback, useMemo } from "react";
import Increaser from "./Increaser/Increaser";
import { CurrentStatus } from "../../../types";
import { gridElementStyle } from "../../../styles";
import { Graphics as PixiGraphics } from "pixi.js";
import { PixelateFilter } from "@pixi/filter-pixelate";

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
    scale: number;
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
        scale,
    } = props;

    const fillColors: number[] = useMemo(
        () => [0xa25f4e, 0x485c4a, 0x5e5b3d],
        [],
    );

    const pixelFilter = useMemo(() => {
        const pixelScale = 3 * scale;
        return new PixelateFilter(pixelScale);
    }, [scale]);

    const draw = useCallback(
        (g: PixiGraphics) => {
            g.clear();

            g.lineStyle(10 * scale, 0xcbc6af, 1);
            g.beginFill(
                collectable ? 0xfcee21 : fillColors[levelSelected - 1],
                0.6,
            );
            g.drawRoundedRect(0, 0, elWidth, elHeight, 2);
            g.endFill();
        },
        [elWidth, elHeight, collectable, fillColors, levelSelected, scale],
    );

    const textStyle = useMemo(
        () => gridElementStyle(elHeight, collectable),
        [elHeight, collectable],
    );

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
        <Container x={x} y={y} anchor={0}>
            <Graphics
                draw={draw}
                interactive={collectable}
                onclick={onCollect}
                cursor={collectable ? "pointer" : "default"}
                filters={[pixelFilter]}
            />

            <Increaser
                type={increaserType}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                width={elWidth}
                height={elHeight}
            />
            <Text
                text={currValue.toString()}
                style={textStyle}
                x={10 * scale}
                y={0.2 * elHeight}
                anchor={0}
            />
        </Container>
    );
};

export default GridElement;
