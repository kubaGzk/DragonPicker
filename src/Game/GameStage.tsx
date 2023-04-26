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

import Background from "./Background/Background";
import GameLogo from "./UserMenu/GameLogo/GameLogo";
import { scaleCalculator } from "./game-utils";

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
        leaderboardError,
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

    const logoOn: boolean =
        !saveMenuOn &&
        !confirmMenuOn &&
        !leaderboardLoading &&
        !leaderboardOn &&
        !menuOn &&
        !leaderboardError;

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
