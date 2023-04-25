import { Container, Sprite, Text } from "@pixi/react";
import { FC, useMemo, useState } from "react";
import { calculateDimension } from "../../../utils";
import { levelTextStyle, multiplierTextStyle } from "../../../styles";
import { OutlineFilter } from "@pixi/filter-outline";
import { Assets, Texture } from "pixi.js";

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

    const { x, y } = calculateDimension(width, height, index, numberOfLevels);

    const [filters, setFilters] = useState<OutlineFilter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0xfcee21, 0.1, 0.3),
        [],
    );

    const levelImg: Texture = Assets.get(`level${id}`);

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
