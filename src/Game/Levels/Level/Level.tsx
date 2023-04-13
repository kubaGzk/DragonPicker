import { Container, Sprite, Text } from "@pixi/react";
import { FC, useMemo, useState } from "react";
import { calculateDimension } from "../../../utils";
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
}

const Level: FC<LevelProps> = (props) => {
    const { img_url, name, multiplier, index, width, height, onClick } = props;

    const { x, y, itemWidth, itemHeight } = calculateDimension(
        width,
        height,
        index,
    );

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

    // const draw = useCallback((g: any) => {
    //     g.clear();

    //     g.lineStyle(2, 0xff00bb, 1);
    //     g.beginFill(0xff00bb, 0.25);
    //     g.drawRoundedRect(0, 0, 300, 400, 15);
    //     g.endFill();
    // }, []);

    return (
        <Container
            height={itemHeight}
            width={itemWidth}
            x={x}
            y={y}
            interactive={true}
            onmouseenter={addFilterHandler}
            onmouseleave={removeFilterHandler}
            onclick={onClick}
        >
            {/* <Graphics draw={draw} /> */}

            <Sprite
                image={img_url}
                x={itemWidth / 2}
                y={itemHeight / 2}
                width={itemWidth * 0.8}
                height={itemHeight * 0.8}
                anchor={0.5}
                zIndex={2}
                filters={filters}
            />
            <Text
                text={`MAX Multiplier ${multiplier}`}
                style={multiplierTextStyle}
                x={10}
                y={10}
                anchor={0}
                zIndex={3}
                filters={filters}
            />
            <Text
                text={name}
                style={levelTextStyle}
                x={itemWidth / 2}
                width={itemWidth}
                y={itemHeight * 0.9}
                anchor={0.5}
                zIndex={3}
                filters={filters}
            />
        </Container>
    );
};

export default Level;
