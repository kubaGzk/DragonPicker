import { FC, useMemo } from "react";
import { useAppSelector, useWindowResize } from "../hooks/hooks";
import Levels from "./Levels/Levels";
import Map from "./Map/Map";
import Stage from "./BridgedStage/BridgedStage";
import UserMenu from "./UserMenu/UserMenu";

import Background1 from "../assets/Background/Battleground1.png";
import Background2 from "../assets/Background/Battleground2.png";
import Background3 from "../assets/Background/Battleground3.png";
import Background4 from "../assets/Background/Battleground4.png";

import Background from "./Background/Background";
import GameLogo from "./UserMenu/GameLogo/GameLogo";
import { scaleCalculator } from "../utils";

interface GameStageProps {}

const GameStage: FC<GameStageProps> = () => {
    const { isAuth, levelSelected, menuOn } = useAppSelector((state) => ({
        ...state.auth,
        ...state.gameStatus,
        ...state.menu,
    }));

    const { width, height } = useWindowResize();
    const scale = useMemo(
        () => scaleCalculator(width, height),
        [width, height],
    );

    return (
        <Stage width={width} height={height}>
            <Background
                width={width}
                height={height}
                levelSelected={levelSelected}
                assets={[Background1, Background2, Background3, Background4]}
            />
            {isAuth && <UserMenu width={width} height={height} scale={scale} />}

            {isAuth &&
                (levelSelected > 0 ? (
                    <Map width={width} height={height} scale={scale} />
                ) : (
                    <>
                        {!menuOn && (
                            <GameLogo
                                width={width}
                                height={height}
                                scale={scale}
                            />
                        )}
                        <Levels width={width} height={height} scale={scale} />
                    </>
                ))}
        </Stage>
    );
};

export default GameStage;
