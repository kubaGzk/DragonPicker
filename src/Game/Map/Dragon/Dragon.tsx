import { FC, useState, useEffect } from "react";
import { Container, useTick } from "@pixi/react";
import WalkingDragon from "./WalkingDragon/WalkingDragon";
import AttackingDragon from "./AttackingDragon/AttackingDragon";
import DragonFlame from "./DragoFlame/DragonFlame";
import FlameBlow from "./Flames/FlameBlow/FlameBlow";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { removeWinnersPoistion } from "../../../store/gameStatus";
import Flames from "./Flames/Flames";

interface DragonProps {
    width: number;
    height: number;
}

const Dragon: FC<DragonProps> = (props) => {
    const { width } = props;

    const { winnersPosition, gridElHeight } = useAppSelector(
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
        setCommonY(winnersPosition[winnersPosition.length - 1].y);

        dragonEntrance();
    }, []);

    useTick((delta) => {
        //DragonEntrance
        if (walk && walkX > width * 0.8) {
            setWalkX((prevX) => prevX - delta);
        } else if (walk && walkX <= width * 0.8) {
            setWalk(false);

            setTimeout(() => {
                setThrowFlame(true);
            }, 300);
        }
    });

    useTick((delta) => {
        //DragonExit
        if (exit && walkX < width * 1.05) {
            setWalkX((prevX) => prevX + delta);
        } else if (exit && walkX <= width * 1.05) {
            setExit(false);
        }
    });

    useTick((delta) => {
        //FlameThrower
        if (
            throwFlame &&
            flameX > winnersPosition[winnersPosition.length - 1].x
        ) {
            setFlameX((prevX) => prevX - delta);
        } else if (
            throwFlame &&
            flameX <= winnersPosition[winnersPosition.length - 1].x
        ) {
            setThrowFlame(false);
        }
    });

    const removeBlowHandler = (x: number) => {
        dispatch(removeWinnersPoistion({ x }));
    };

    const dragonEntrance = () => {
        setWalk(true);
    };

    const dragonExit = () => {
        setExit(true);
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
                removeBlowHandler={removeBlowHandler}
                winnersPosition={winnersPosition}
                gridElHeight={gridElHeight}
                flameX={flameX}
            />
        </Container>
    );
};

export default Dragon;
