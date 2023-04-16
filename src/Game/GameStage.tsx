import { FC } from "react";
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

interface GameStageProps {}

const GameStage: FC<GameStageProps> = () => {
    // const blurFilter = useMemo(() => new BlurFilter(1), []);
    const { width, height } = useWindowResize();

    const { levelSelected, isAuth } = useAppSelector(
        (state) => state.gameStatus,
    );

    return (
        <Stage width={width} height={height}>
            <Background
                width={width}
                height={height}
                levelSelected={levelSelected}
                assets={[Background1, Background2, Background3, Background4]}
            />
            {isAuth && <UserMenu width={width} height={height} />}

            {isAuth ? (
                levelSelected > 0 ? (
                    <Map width={width} height={height} />
                ) : (
                    <>
                        <GameLogo width={width} height={height} />
                        <Levels width={width} height={height} />
                    </>
                )
            ) : null}
        </Stage>
    );
};

export default GameStage;
