import { FC, useState, useEffect } from "react";
import Fire_Attack4 from "../../../../../assets/Dragon/Fire_Attack4.png";
import Fire_Attack5 from "../../../../../assets/Dragon/Fire_Attack5.png";
import Fire_Attack6 from "../../../../../assets/Dragon/Fire_Attack6.png";
import { AnimatedSprite } from "@pixi/react";

interface FlameBlowProps {
    x: number;
    y: number;
    gridElHeight: number;
    onComplete: () => void;
    flameX: number;
}

const FlameBlow: FC<FlameBlowProps> = (props) => {
    const { x, y, gridElHeight, flameX, onComplete } = props;

    const [showBlow, setShowBlow] = useState<boolean>(false);

    useEffect(() => {
        console.log(flameX);

        if (
            (Math.round(flameX) ||
                Math.round(flameX) - 1 ||
                Math.round(flameX) + 1) === Math.round(x)
        ) {
            setShowBlow(true);
        }
    }, [flameX, x]);

    const completeBlowHandler = () => {
        if (showBlow) {
            onComplete();
            setShowBlow(false);
        }
    };

    return (
        <AnimatedSprite
            isPlaying={true}
            animationSpeed={0.1}
            images={[Fire_Attack4, Fire_Attack5, Fire_Attack6]}
            x={x - 0.3 * gridElHeight}
            y={y - gridElHeight}
            width={gridElHeight * 2.5}
            height={gridElHeight * 2.5}
            onLoop={completeBlowHandler}
            visible={showBlow}
        />
    );
};

export default FlameBlow;
