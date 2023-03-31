import { FC } from "react";

import { useWindowResize } from "../hooks/hooks";
import Levels from "./Levels/Levels";
import Map from "./Map/Map";
import Stage from "./BridgedStage/BridgedStage";
import UserMenu from "./UserMenu/UserMenu";
interface GameStageProps {}

const GameStage: FC<GameStageProps> = () => {
    // const blurFilter = useMemo(() => new BlurFilter(1), []);
    const { width, height } = useWindowResize();

    return (
        <Stage width={width} height={height}>
            <UserMenu width={width} height={height} />
            <Map width={width} height={height}/>
            {/* <Levels width={width} height={height} /> */}
        </Stage>
    );
};

export default GameStage;
