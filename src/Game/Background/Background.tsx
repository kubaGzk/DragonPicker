import { FC } from "react";
import { Sprite } from "@pixi/react";
import { Assets } from "pixi.js";

interface BackgroundProps {
    width: number;
    height: number;
    levelSelected: number;
}

const Background: FC<BackgroundProps> = (props) => {
    const { width, height, levelSelected } = props;

    //every background must be 1920x1080
    const texture = Assets.get(`background${levelSelected}`);

    return (
        <Sprite
            texture={texture}
            anchor={0.5}
            x={width / 2}
            y={height / 2}
            scale={{ x: width / 1920, y: height / 1080 }}
        />
    );
};

export default Background;
