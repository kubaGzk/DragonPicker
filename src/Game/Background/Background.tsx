import { Sprite } from "@pixi/react";
import { FC } from "react";

import { Level } from "../../types";

interface BackgroundProps {
    width: number;
    height: number;
    levelSelected: Level;
    assets: string[];
}

const Background: FC<BackgroundProps> = (props) => {
    const { width, height, levelSelected, assets } = props;

    let background: string;

    switch (levelSelected) {
        case Level.Menu:
            background = assets[0];
            break;
        case Level.First:
            background = assets[1];
            break;
        case Level.Second:
            background = assets[2];
            break;
        case Level.Third:
            background = assets[3];
            break;
    }

    return (
        <Sprite image={background} x={0} y={0} width={width} height={height} />
    );
};

export default Background;
