import { FC, ReactNode, useMemo, useEffect } from "react";
import { Sprite, Text, Container } from "@pixi/react";
import { OutlineFilter } from "@pixi/filter-outline";
import { Assets, Texture } from "pixi.js";
import Dragon from "../Dragon/Dragon";
import { CurrentStatus } from "../../../types";
import { endGameStyle } from "../../../styles";
import { useSounds } from "../../../hooks/sounds";

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

    const playButton: Texture = Assets.get("playButton");
    const endGameButton: Texture = Assets.get("endGameButton");
    const collectAllButton: Texture = Assets.get("collectAllButton");

    const { playClick, playCollect, playWin, playLose } = useSounds();

    useEffect(() => {
        if (currentStatus === CurrentStatus.Collect && totalWin > 0) {
            playWin();
        } else if (currentStatus === CurrentStatus.Collect) {
            playLose();
        }
    }, [currentStatus, totalWin, playWin, playLose]);

    const mouseEnter = () => {
        turnPointerOnHandler();
    };

    const mouseLeave = () => {
        turnPointerOffHandler();
    };

    const startMouseClick = () => {
        startGame();
        turnPointerOffHandler();
        playClick();
    };

    const collectMouseClick = () => {
        collectAll();
        playCollect();
    };

    const endMouseClick = () => {
        collectAll();
        playClick();
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
                        texture={playButton}
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
                            texture={collectAllButton}
                            interactive={true}
                            onclick={collectMouseClick}
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
                            texture={endGameButton}
                            interactive={true}
                            onclick={endMouseClick}
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
