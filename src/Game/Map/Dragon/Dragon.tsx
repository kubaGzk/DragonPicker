import { FC, useState, useEffect } from "react";
import { Container, useTick } from "@pixi/react";
import WalkingDragon from "./WalkingDragon/WalkingDragon";
import AttackingDragon from "./AttackingDragon/AttackingDragon";
import DragonFlame from "./DragonFlame/DragonFlame";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Flames from "./Flames/Flames";
import { endGame, setCollectable } from "../../../store/gameStatus";

interface DragonProps {
    width: number;
    height: number;
}

const Dragon: FC<DragonProps> = (props) => {
    const { width } = props;
    console.log(width);

    const { winners, gridElHeight } = useAppSelector(
        (state) => state.gameStatus,
    );
    const dispatch = useAppDispatch();

    const [walk, setWalk] = useState<boolean>(false);
    const [exit, setExit] = useState<boolean>(false);
    const [walkX, setWalkX] = useState<number>(0);

    const [throwFlame, setThrowFlame] = useState<boolean>(false);
    const [flameX, setFlameX] = useState<number>(0);

    const [commonY, setCommonY] = useState<number>(0);

    useEffect(() => {
        setWalkX(width * 1.05);
        setFlameX(width * 0.8);
        setCommonY(winners[0].y);

        dragonEntrance();
    }, []);

    useTick((delta) => {
        //DragonEntrance
        if (walk && walkX > width * 0.8) {
            setWalkX((prevX) => prevX - delta * 2);
        } else if (walk && walkX <= width * 0.8) {
            setWalk(false);

            setTimeout(() => {
                setThrowFlame(true);
            }, 300);
        }

        //DragonExit
        if (exit && walkX < width * 1.05) {
            setWalkX((prevX) => prevX + delta);
        } else if (exit && walkX <= width * 1.05) {
            setExit(false);
        }

        //FlameThrower
        if (throwFlame && flameX > winners[winners.length - 1].x) {
            setFlameX((prevX) => prevX - delta * 2);
        } else if (throwFlame && flameX <= winners[winners.length - 1].x) {
            setThrowFlame(false);
        }
    });

    const dragonEntrance = () => {
        setWalk(true);
    };

    const dragonExit = () => {
        setExit(true);
    };

    const collectableHandler = (id: string, ind: number) => {
        dispatch(setCollectable({ id }));
        if (ind + 1 === winners.length) {
            dispatch(endGame());
        }
    };

    return (
        <Container>
            {walk || exit ? (
                <WalkingDragon
                    x={walkX}
                    y={commonY}
                    gridElHeight={gridElHeight}
                />
            ) : (
                <AttackingDragon
                    onComplete={dragonExit}
                    x={walkX}
                    y={commonY}
                    gridElHeight={gridElHeight}
                />
            )}

            {throwFlame && (
                <DragonFlame
                    x={flameX}
                    y={commonY}
                    gridElHeight={gridElHeight}
                />
            )}
            <Flames
                onComplete={collectableHandler}
                winners={winners}
                gridElHeight={gridElHeight}
                flameX={flameX}
            />
        </Container>
    );
};

export default Dragon;
