import { FC } from "react";
import { AnimatedSprite } from "@pixi/react";
import Walk1 from "../../../../assets/Dragon/Walk1.png";
import Walk2 from "../../../../assets/Dragon/Walk2.png";
import Walk3 from "../../../../assets/Dragon/Walk3.png";
import Walk4 from "../../../../assets/Dragon/Walk4.png";
import Walk5 from "../../../../assets/Dragon/Walk5.png";

interface WalkingDragonProps {
    x: number;
    y: number;
    gridElHeight: number;
}

const WalkingDragon: FC<WalkingDragonProps> = (props) => {
    const { x, y, gridElHeight } = props;

    return (
        <AnimatedSprite
            isPlaying={true}
            animationSpeed={0.1}
            images={[Walk1, Walk2, Walk3, Walk4, Walk5]}
            x={x}
            y={y - gridElHeight}
        />
    );
};

export default WalkingDragon;
