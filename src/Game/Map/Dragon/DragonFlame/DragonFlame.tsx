import { FC } from "react";
import { AnimatedSprite } from "@pixi/react";

import Fire_Attack2 from "../../../../assets/Dragon/Fire_Attack2.png";
import Fire_Attack3 from "../../../../assets/Dragon/Fire_Attack3.png";

interface DragonFlameProps {
    x: number;
    y: number;
    gridElHeight: number;
}

const DragonFlame: FC<DragonFlameProps> = (props) => {
    const { x, y, gridElHeight } = props;

    return (
        <AnimatedSprite
            isPlaying={true}
            animationSpeed={0.1}
            images={[Fire_Attack2, Fire_Attack3]}
            x={x}
            y={y}
            width={gridElHeight}
            height={gridElHeight}
        />
    );
};

export default DragonFlame;
