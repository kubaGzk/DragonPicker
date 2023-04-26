import { FC } from "react";
import { Sprite } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

interface GameLogoProps {
    width: number;
    height: number;
    scale: number;
}

const GameLogo: FC<GameLogoProps> = (props) => {
    const { width, height, scale } = props;

    const logo: Texture = Assets.get("gameLogo");

    return (
        <Sprite
            texture={logo}
            anchor={{ x: 0.5, y: 0 }}
            x={width / 2}
            y={height * 0.05}
            scale={scale}
        />
    );
};

export default GameLogo;
