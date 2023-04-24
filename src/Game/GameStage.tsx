import { FC, useMemo, ReactNode } from "react";
import {
    useAppDispatch,
    useAppSelector,
    useWindowResize,
} from "../hooks/hooks";
import Levels from "./Levels/Levels";
import Map from "./Map/Map";
import Stage from "./BridgedStage/BridgedStage";
import UserMenu from "./UserMenu/UserMenu";
import { mousePointerOff, mousePointerOn } from "../store/menu";

import Background0 from "../assets/Background/Battleground0.png";
import Background1 from "../assets/Background/Battleground1.png";
import Background2 from "../assets/Background/Battleground2.png";
import Background3 from "../assets/Background/Battleground3.png";

import Background from "./Background/Background";
import GameLogo from "./UserMenu/GameLogo/GameLogo";
import { scaleCalculator } from "../utils";

interface GameStageProps {}

const GameStage: FC<GameStageProps> = () => {
    const {
        isAuth,
        levelSelected,
        menuOn,
        saveMenuOn,
        confirmMenuOn,
        leaderboardLoading,
        leaderboardOn,
    } = useAppSelector((state) => ({
        ...state.auth,
        ...state.gameStatus,
        ...state.menu,
    }));

    const dispatch = useAppDispatch();

    const { width, height } = useWindowResize();

    const scale = useMemo(
        () => scaleCalculator(width, height),
        [width, height],
    );

    const turnPointerOnHandler = () => {
        dispatch(mousePointerOn());
    };

    const turnPointerOffHandler = () => {
        dispatch(mousePointerOff());
    };

    const logoOn =
        !saveMenuOn &&
        !confirmMenuOn &&
        !leaderboardLoading &&
        !leaderboardOn &&
        !menuOn;

    let mainElement: ReactNode | null = null;

    if (isAuth && levelSelected > 0) {
        mainElement = (
            <Map
                width={width}
                height={height}
                scale={scale}
                turnPointerOnHandler={turnPointerOnHandler}
                turnPointerOffHandler={turnPointerOffHandler}
            />
        );
    } else if (isAuth && logoOn) {
        mainElement = (
            <>
                <GameLogo width={width} height={height} scale={scale} />
                <Levels
                    width={width}
                    height={height}
                    scale={scale}
                    turnPointerOnHandler={turnPointerOnHandler}
                    turnPointerOffHandler={turnPointerOffHandler}
                />
            </>
        );
    }

    return (
        <Stage width={width} height={height}>
            <Background
                width={width}
                height={height}
                levelSelected={levelSelected}
                assets={[Background0, Background1, Background2, Background3]}
            />
            {isAuth && (
                <UserMenu
                    width={width}
                    height={height}
                    scale={scale}
                    turnPointerOnHandler={turnPointerOnHandler}
                    turnPointerOffHandler={turnPointerOffHandler}
                />
            )}
            {mainElement}
        </Stage>
    );
};

export default GameStage;
