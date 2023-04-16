import { FC, ReactNode, useMemo } from "react";
import { CurrentStatus } from "../../../types";
import Dragon from "../Dragon/Dragon";
import { Sprite, Text, Container } from "@pixi/react";
import { endGameStyle } from "../../../styles";
import { OutlineFilter } from "@pixi/filter-outline";

import Play from "../../../assets/UI/GameControls/Play.png";
import EndGame from "../../../assets/UI/GameControls/EndGame.png";
import CollectAll from "../../../assets/UI/GameControls/CollectAll.png";
import { scaleCalculator } from "../../../utils";

interface GameControlProps {
    currentStatus: CurrentStatus;
    width: number;
    height: number;
    startGame: () => void;
    collectAll: () => void;
    totalWin: number;
}

const GameControl: FC<GameControlProps> = (props) => {
    const { width, height, currentStatus, startGame, collectAll, totalWin } =
        props;

    const outlineFilter = useMemo(
        () => new OutlineFilter(10, 0x000000, 0.1, 0.5),
        [],
    );

    let control: ReactNode;

    switch (currentStatus) {
        case CurrentStatus.Start:
            control = (
                <Container
                    x={0.9 * width}
                    y={height / 2}
                    anchor={0.5}
                    scale={scaleCalculator(width, height)}
                >
                    <Text
                        text={`Place your bids and click Play`}
                        style={endGameStyle}
                        x={0}
                        y={-height / 3}
                        filters={[outlineFilter]}
                        anchor={0.5}
                    />
                    <Sprite
                        image={Play}
                        interactive={true}
                        onclick={startGame}
                        x={0}
                        y={height / 3}
                        anchor={0.5}
                        cursor="pointer"
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
                    <Container
                        x={0.9 * width}
                        y={height / 2}
                        anchor={0.5}
                        scale={scaleCalculator(width, height)}
                    >
                        <Text
                            text={`You won ${totalWin} coins`}
                            style={endGameStyle}
                            x={0}
                            y={-height / 3}
                            filters={[outlineFilter]}
                            anchor={0.5}
                        />
                        <Sprite
                            image={CollectAll}
                            interactive={true}
                            onclick={collectAll}
                            x={0}
                            y={height / 3}
                            anchor={0.5}
                            cursor="pointer"
                        />
                    </Container>
                ) : (
                    <Container
                        x={0.9 * width}
                        y={height / 2}
                        anchor={0.5}
                        scale={scaleCalculator(width, height)}
                    >
                        <Text
                            text={`Try again, you won 0 coins`}
                            style={endGameStyle}
                            x={0}
                            y={-height / 3}
                            filters={[outlineFilter]}
                            anchor={0.5}
                        />
                        <Sprite
                            image={EndGame}
                            interactive={true}
                            onclick={collectAll}
                            x={0}
                            y={height / 3}
                            anchor={0.5}
                            cursor="pointer"
                        />
                    </Container>
                );
            break;
    }

    return control;
};

export default GameControl;