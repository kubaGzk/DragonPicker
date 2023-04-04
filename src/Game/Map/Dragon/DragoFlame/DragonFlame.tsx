import { FC } from "react";
import { AnimatedSprite } from "@pixi/react";

import Fire_Attack1 from "../../../../assets/Dragon/Fire_Attack1.png";
import Fire_Attack2 from "../../../../assets/Dragon/Fire_Attack2.png";
import Fire_Attack3 from "../../../../assets/Dragon/Fire_Attack3.png";
import Fire_Attack4 from "../../../../assets/Dragon/Fire_Attack4.png";
import Fire_Attack5 from "../../../../assets/Dragon/Fire_Attack5.png";
import Fire_Attack6 from "../../../../assets/Dragon/Fire_Attack6.png";

interface DragonFlameProps {
    onComplete: () => void;
    x: number;
    y: number;
}

const DragonFlame: FC<DragonFlameProps> = (props) => {
    const { onComplete, x, y } = props;

    return (
        <AnimatedSprite
            isPlaying={true}
            animationSpeed={0.05}

            images={[
                Fire_Attack1,
                Fire_Attack2,
                Fire_Attack3,
                Fire_Attack2,
                Fire_Attack3,
                Fire_Attack2,
                Fire_Attack3,
                Fire_Attack2,
                Fire_Attack3,
                Fire_Attack2,
                Fire_Attack3,
                Fire_Attack4,
                Fire_Attack5,
                Fire_Attack6,
            ]}
            onLoop={onComplete}
            x={x}
            y={y}
        />
    );
};

export default DragonFlame;
