import { FC } from "react";
import { Sprite } from "@pixi/react";

import Logo from "../../../assets/UI/GameLogo/GameLogo.png";

interface GameLogoProps {
    width: number;
    height: number;
    scale: number;
}

const GameLogo: FC<GameLogoProps> = (props) => {
    const { width, height, scale } = props;
    return (
        <Sprite
            image={Logo}
            anchor={{ x: 0.5, y: 0 }}
            x={width / 2}
            y={height * 0.05}
            scale={scale}
        />
    );
};

export default GameLogo;
