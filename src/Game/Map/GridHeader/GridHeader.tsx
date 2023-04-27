import { Text } from "@pixi/react";
import { FC } from "react";
import { coinsTextStyle } from "../../../styles";

interface GridHeaderProps {
    x: number;
    y: number;
    value: string;
    scale: number;
}

const GridHeader: FC<GridHeaderProps> = (props) => {
    const { x, y, value, scale } = props;

    return (
        <Text
            text={value}
            style={coinsTextStyle}
            x={x}
            y={y}
            anchor={{ x: 0, y: 1 }}
            scale={scale*2}
        />
    );
};

export default GridHeader;
