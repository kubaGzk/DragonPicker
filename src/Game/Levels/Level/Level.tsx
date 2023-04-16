import { Container, Sprite, Text } from "@pixi/react";
import { FC, useMemo, useState } from "react";
import { calculateDimension, scaleCalculator } from "../../../utils";
import { levelTextStyle, multiplierTextStyle } from "../../../styles";
import { OutlineFilter } from "@pixi/filter-outline";

interface LevelProps {
    img_url: string;
    name: string;
    multiplier: string;
    index: number;
    width: number;
    height: number;
    onClick: () => void;
    numberOfLevels: number;
}

const Level: FC<LevelProps> = (props) => {
    const {
        img_url,
        name,
        multiplier,
        index,
        width,
        height,
        onClick,
        numberOfLevels,
    } = props;

    const { x, y } = calculateDimension(width, height, index, numberOfLevels);

    const [filters, setFilters] = useState<OutlineFilter[]>([]);

    const outlineFilter = useMemo(
        () => new OutlineFilter(5, 0xfcee21, 0.1, 0.3),
        [],
    );

    const addFilterHandler = () => {
        setFilters([outlineFilter]);
    };

    const removeFilterHandler = () => {
        setFilters([]);
    };

    return (
        <Container
            x={x}
            y={y}
            interactive={true}
            onmouseenter={addFilterHandler}
            onmouseleave={removeFilterHandler}
            onclick={onClick}
            pivot={{ x: 0.5, y: 0 }}
            scale={scaleCalculator(width, height)}
            cursor="pointer"
        >
            <Sprite image={img_url} anchor={0.5} filters={filters} />
            <Text
                text={`Bid Multiplier ${multiplier}`}
                style={multiplierTextStyle}
                x={10}
                y={-190}
                anchor={0.5}
                // filters={filters}
            />
            <Text
                text={name}
                style={levelTextStyle}
                y={190}
                anchor={{x:0.5, y:0.5}}
                
                // filters={filters}
            />
        </Container>
    );
};

export default Level;
