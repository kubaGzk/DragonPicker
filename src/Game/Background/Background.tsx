import { Sprite } from "@pixi/react";
import { FC } from "react";

interface BackgroundProps {
    width: number;
    height: number;
    levelSelected: number;
    assets: string[];
}

const Background: FC<BackgroundProps> = (props) => {
    const { width, height, levelSelected, assets } = props;

    //every background must be 1920x1080
    return (
        <Sprite
            image={assets[levelSelected]}
            anchor={0.5}
            x={width / 2}
            y={height / 2}
            scale={{ x: width / 1920, y: height / 1080 }}
        />
    );
};

export default Background;
