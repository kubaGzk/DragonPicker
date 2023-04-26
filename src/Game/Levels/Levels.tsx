import { FC } from "react";
import Level from "./Level/Level";
import { useAppDispatch } from "../../hooks/hooks";
import { selectLevel } from "../../store/gameStatus";

interface LevelsProps {
    width: number;
    height: number;
    scale: number;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const Levels: FC<LevelsProps> = (props) => {
    const {
        width,
        height,
        scale,
        turnPointerOnHandler,
        turnPointerOffHandler,
    } = props;

    const levelArr: {
        name: string;
        id: number;
        maxMultiplier: string;
    }[] = [
        {
            name: "Level 1",
            id: 1,
            maxMultiplier: "6",
        },
        {
            name: "Level 2",
            id: 2,

            maxMultiplier: "8",
        },
        {
            name: "Level 3",
            id: 3,
            maxMultiplier: "10",
        },
    ];

    const dispatch = useAppDispatch();

    const levelSelectHandler = (level: number) => {
        dispatch(selectLevel({ level, scale }));
    };

    return (
        <>
            {levelArr.map((lvl, ind) => (
                <Level
                    key={lvl.name}
                    name={lvl.name}
                    multiplier={lvl.maxMultiplier}
                    index={ind}
                    id={lvl.id}
                    width={width}
                    height={height}
                    onClick={() => levelSelectHandler(lvl.id)}
                    numberOfLevels={levelArr.length}
                    scale={scale}
                    turnPointerOnHandler={turnPointerOnHandler}
                    turnPointerOffHandler={turnPointerOffHandler}
                />
            ))}
        </>
    );
};

export default Levels;
