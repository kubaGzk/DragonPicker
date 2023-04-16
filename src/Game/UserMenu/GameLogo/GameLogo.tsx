import { FC } from "react";
import { Sprite } from "@pixi/react";

import Logo from "../../../assets/UI/GameLogo/GameLogo.png";
import { scaleCalculator } from "../../../utils";

interface GameLogoProps {
    width: number;
    height: number;
}

const GameLogo: FC<GameLogoProps> = (props) => {
    const { width, height } = props;
    return (
        <Sprite
            image={Logo}
            anchor={{ x: 0.5, y: 0 }}
            x={width / 2}
            y={height * 0.05}
            scale={scaleCalculator(width, height)}
        />
    );
};

export default GameLogo;
