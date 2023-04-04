import { FC } from "react";
import { AnimatedSprite } from "@pixi/react";

import Attack1 from "../../../../assets/Dragon/Attack1.png";
import Attack2 from "../../../../assets/Dragon/Attack2.png";
import Attack3 from "../../../../assets/Dragon/Attack3.png";
import Attack4 from "../../../../assets/Dragon/Attack4.png";

interface AttackingDragonProps {
    onComplete: () => void;
    x: number;
    y: number;
}

const AttackingDragon: FC<AttackingDragonProps> = (props) => {
    const { onComplete, x ,y } = props;

    return (
        <AnimatedSprite
            isPlaying={true}
            animationSpeed={0.1}
            images={[Attack4, Attack3, Attack2, Attack1, Attack2, Attack3, Attack4]}
            onLoop={onComplete}
            x={x} y={y}
        />
    );
};

export default AttackingDragon;
