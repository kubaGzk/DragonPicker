import { FC } from "react";
import Level1 from "../../assets/Caves/Level1.png";
import Level2 from "../../assets/Caves/Level2.png";
import Level3 from "../../assets/Caves/Level3.png";
import Level from "./Level/Level";
import { useAppDispatch } from "../../hooks/hooks";
import { selectLevel } from "../../store/gameStatus";
import { Level as TLevel } from "../../types";

interface LevelsProps {
    width: number;
    height: number;
}

const Levels: FC<LevelsProps> = (props) => {
    const { width, height } = props;

    const levelArr: {
        name: string;
        id: TLevel;
        img_url: string;
        maxMultiplier: string;
    }[] = [
        {
            name: "Level 1",
            id: TLevel.First,
            img_url: Level1,
            maxMultiplier: "6",
        },
        {
            name: "Level 2",
            id: TLevel.Second,
            img_url: Level2,
            maxMultiplier: "8",
        },
        {
            name: "Level 3",
            id: TLevel.Third,
            img_url: Level3,
            maxMultiplier: "10",
        },
    ];

    const dispatch = useAppDispatch();

    const levelSelectHandler = (level: TLevel) => {
        dispatch(selectLevel({ level, width, height }));
    };

    return (
        <>
            {levelArr.map((lvl, ind) => (
                <Level
                    key={lvl.name}
                    img_url={lvl.img_url}
                    name={lvl.name}
                    multiplier={lvl.maxMultiplier}
                    index={ind}
                    width={width}
                    height={height}
                    onClick={() => levelSelectHandler(lvl.id)}
                />
            ))}
        </>
    );
};

export default Levels;
