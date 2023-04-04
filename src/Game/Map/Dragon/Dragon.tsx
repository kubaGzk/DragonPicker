import { FC, useState, useEffect, useCallback } from "react";
import { Container, Sprite, useTick } from "@pixi/react";
import WalkingDragon from "./WalkingDragon/WalkingDragon";
import AttackingDragon from "./AttackingDragon/AttackingDragon";
import Walk1 from "../../../assets/Dragon/Walk1.png";
import DragonFlame from "./DragoFlame/DragonFlame";

interface DragonProps {
    width: number;
    height: number;
    targetX: number;
    targetY: number;
}

const Dragon: FC<DragonProps> = (props) => {
    const { width, targetX, targetY } = props;

    const [walk, setWalk] = useState<boolean>(false);
    const [x, setX] = useState<number>(width * 1.05);

    const [throwFlame, setThrowFlame] = useState<boolean>(false);
    const [flameX, setFlameX] = useState<number>(width * 0.8);

    const endDragonFlame = () => {
        setThrowFlame(false);
    };

    const dragonFlame = useCallback(() => {
        setThrowFlame(true);
        let i = 0;
        const entrance = setInterval(() => {
            const intervalX = (width * 0.8 - targetX) / 45;

            i++;
            setFlameX((prevX) => prevX - intervalX);
            if (i === 45) {
                clearInterval(entrance);
            }
        }, 100);
    }, []);

    const dragonEntrance = useCallback(() => {
        setWalk(true);
        let i = 0;
        const entrance = setInterval(() => {
            i++;
            setX((prevX) => prevX - 0.01 * width);
            if (i === 25) {
                clearInterval(entrance);
                setWalk(false);
                setTimeout(() => dragonFlame(), 300);
            }
        }, 100);
    }, []);

    const dragonExit = useCallback(() => {
        setWalk(true);
        let i = 0;
        const entrance = setInterval(() => {
            i++;
            setX((prevX) => prevX + 0.01 * width);
            if (i === 25) {
                clearInterval(entrance);
            }
        }, 100);
    }, []);

    useEffect(() => {
        dragonEntrance();
    }, []);

    return (
        <Container>
            {walk ? (
                <WalkingDragon x={x} y={targetY} />
            ) : (
                <AttackingDragon onComplete={dragonExit} x={x} y={targetY} />
            )}

            {throwFlame && (
                <DragonFlame
                    onComplete={endDragonFlame}
                    x={flameX - 55}
                    y={targetY + 55}
                />
            )}
        </Container>
    );
};

export default Dragon;
