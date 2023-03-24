import { FC } from "react";
import Level1 from "../../game_content/Caves/Level1.png";
import Level2 from "../../game_content/Caves/Level2.png";
import Level3 from "../../game_content/Caves/Level3.png";
import Level from "./Level/Level";

interface LevelsProps {
    width: number;
    height: number;
}

const Levels: FC<LevelsProps> = (props) => {
    const { width, height } = props;

    const levelArr: { name: string; multiplier: number; img_url: string }[] = [
        { name: "Level 1", multiplier: 1, img_url: Level1 },
        { name: "Level 2", multiplier: 2, img_url: Level2 },
        { name: "Level 3", multiplier: 3, img_url: Level3 },
    ];

    return (
        <>
            {levelArr.map((lvl, ind) => (
                <Level
                    key={lvl.name}
                    img_url={lvl.img_url}
                    name={lvl.name}
                    multiplier={lvl.multiplier}
                    index={ind}
                    width={width}
                    height={height}
                />
            ))}
        </>
    );
};

export default Levels;
