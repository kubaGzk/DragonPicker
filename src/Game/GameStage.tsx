import { FC } from "react";

import { useWindowResize } from "../hooks/hooks";
import Levels from "./Levels/Levels";
import Stage from "./Stage/Stage";
import UserMenu from "./UserMenu/UserMenu";
interface GameStageProps {}

const GameStage: FC<GameStageProps> = () => {
    // const blurFilter = useMemo(() => new BlurFilter(1), []);
    const { width, height } = useWindowResize();
    
    return (
        //@ts-ignore
        <Stage
            width={width}
            height={height}
        >
            <UserMenu width={width} height={height} />
            <Levels width={width} height={height} />
            {/* <Container x={400} y={330}>
            <Text
                text="Hello World"
                anchor={{ x: 0.5, y: 0.5 }}
                filters={[blurFilter]}
            />
        </Container> */}
        </Stage>
    );
};

export default GameStage;
