import { FC, useMemo, useState } from "react";
import { Assets, Texture } from "pixi.js";
import { Container, Sprite, Text } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";
import { calculateDimension } from "./level-utils";
import { levelTextStyle, multiplierTextStyle } from "../../../styles";
import { useSounds } from "../../../hooks/sounds";

interface LevelProps {
    name: string;
    multiplier: string;
    index: number;
    width: number;
    height: number;
    onClick: () => void;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
    numberOfLevels: number;
    scale: number;
    id: number;
}

const Level: FC<LevelProps> = (props) => {
    const {
        name,
        multiplier,
        index,
        id,
        width,
        height,
        onClick,
        numberOfLevels,
        scale,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    const levelImg: Texture = Assets.get(`level${id}`);

    const { x, y } = useMemo(
        () => calculateDimension(width, height, index, numberOfLevels),
        [width, height, index, numberOfLevels],
    );

    const [filters, setFilters] = useState<OutlineFilter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0xfcee21, 0.1, 0.3),
        [],
    );

    const { playClick } = useSounds();

    const mouseEnter = () => {
        turnPointerOnHandler();
        setFilters([outlineFilter]);
    };

    const mouseLeave = () => {
        turnPointerOffHandler();
        setFilters([]);
    };
    const mouseClick = () => {
        onClick();
        turnPointerOffHandler();
        playClick();
    };

    return (
        <Container
            x={x}
            y={y}
            interactive={true}
            onmouseenter={mouseEnter}
            onmouseleave={mouseLeave}
            onclick={mouseClick}
            pivot={{ x: 0.5, y: 0 }}
            scale={scale}
        >
            <Sprite texture={levelImg} anchor={0.5} filters={filters} />
            <Text
                text={`Bid Multiplier ${multiplier}`}
                style={multiplierTextStyle}
                x={10}
                y={-190}
                anchor={0.5}
            />
            <Text
                text={name}
                style={levelTextStyle}
                y={190}
                anchor={{ x: 0.5, y: 0.5 }}
            />
        </Container>
    );
};

export default Level;
