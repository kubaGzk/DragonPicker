import { FC, ReactNode, useMemo } from "react";
import { CurrentStatus } from "../../../types";
import Dragon from "../Dragon/Dragon";
import { Sprite, Text, Container } from "@pixi/react";
import { endGameStyle } from "../../../styles";
import { OutlineFilter } from "@pixi/filter-outline";

import Play from "../../../assets/UI/GameControls/Play.png";
import EndGame from "../../../assets/UI/GameControls/EndGame.png";
import CollectAll from "../../../assets/UI/GameControls/CollectAll.png";

interface GameControlProps {
    currentStatus: CurrentStatus;
    width: number;
    height: number;
    startGame: () => void;
    collectAll: () => void;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
    totalWin: number;
    scale: number;
}

const GameControl: FC<GameControlProps> = (props) => {
    const {
        width,
        height,
        currentStatus,
        startGame,
        collectAll,
        turnPointerOnHandler,
        turnPointerOffHandler,
        totalWin,
        scale,
    } = props;

    const outlineFilter = useMemo(
        () => new OutlineFilter(10, 0x000000, 0.1, 0.5),
        [],
    );
    const mouseEnter = () => {
        turnPointerOnHandler();
    };

    const mouseLeave = () => {
        turnPointerOffHandler();
    };

    const startMouseClick = () => {
        startGame();
        turnPointerOffHandler();
    };

    const collecMouseClick = () => {
        collectAll();
    };

    let control: ReactNode;

    switch (currentStatus) {
        case CurrentStatus.Start:
            control = (
                <Container x={0.9 * width} y={height / 2} anchor={0.5}>
                    <Text
                        text={`Place your bids and click Play`}
                        style={endGameStyle}
                        x={0}
                        y={-height / 4}
                        filters={[outlineFilter]}
                        anchor={0.5}
                        scale={scale}
                    />
                    <Sprite
                        image={Play}
                        interactive={true}
                        onclick={startMouseClick}
                        x={0}
                        y={height / 4}
                        anchor={0.5}
                        scale={scale}
                        onmouseenter={mouseEnter}
                        onmouseleave={mouseLeave}
                    />
                </Container>
            );
            break;

        case CurrentStatus.Play:
            control = <Dragon width={width} height={height} />;
            break;
        case CurrentStatus.Collect:
            control =
                totalWin > 0 ? (
                    <Container x={0.9 * width} y={height / 2} anchor={0.5}>
                        <Text
                            text={`You won ${totalWin} coins`}
                            style={endGameStyle}
                            x={0}
                            y={-height / 4}
                            filters={[outlineFilter]}
                            anchor={0.5}
                            scale={scale}
                        />
                        <Sprite
                            image={CollectAll}
                            interactive={true}
                            onclick={collecMouseClick}
                            x={0}
                            y={height / 4}
                            anchor={0.5}
                            scale={scale}
                            onmouseenter={mouseEnter}
                            onmouseleave={mouseLeave}
                        />
                    </Container>
                ) : (
                    <Container x={0.9 * width} y={height / 2} anchor={0.5}>
                        <Text
                            text={`Try again, you won 0 coins`}
                            style={endGameStyle}
                            x={0}
                            y={-height / 4}
                            filters={[outlineFilter]}
                            anchor={0.5}
                            scale={scale}
                        />
                        <Sprite
                            image={EndGame}
                            interactive={true}
                            onclick={collecMouseClick}
                            x={0}
                            y={height / 4}
                            anchor={0.5}
                            scale={scale}
                            onmouseenter={mouseEnter}
                            onmouseleave={mouseLeave}
                        />
                    </Container>
                );
            break;
    }

    return control;
};

export default GameControl;
