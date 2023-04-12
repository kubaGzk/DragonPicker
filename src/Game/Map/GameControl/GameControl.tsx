import { FC, ReactNode } from "react";
import { CurrentStatus } from "../../../types";
import Dragon from "../Dragon/Dragon";
import { Text } from "@pixi/react";
import { startStyle } from "../../../styles";

interface GameControlProps {
    currentStatus: CurrentStatus;
    width: number;
    height: number;
    startGame: () => void;
    collectAll: () => void;
}

const GameControl: FC<GameControlProps> = (props) => {
    const { width, height, currentStatus, startGame, collectAll } = props;

    let control: ReactNode;

    switch (currentStatus) {
        case CurrentStatus.Start:
            control = (
                <Text
                    text={"Start Game"}
                    style={startStyle}
                    x={width * 0.8}
                    y={height / 2}
                    width={150}
                    interactive={true}
                    onclick={startGame}
                />
            );
            break;

        case CurrentStatus.Play:
            control = <Dragon width={width} height={height} />;
            break;
        case CurrentStatus.Collect:
            control = (
                <Text
                    text={"Collect your win"}
                    style={startStyle}
                    x={width * 0.8}
                    y={height / 2}
                    width={150}
                    interactive={true}
                    onclick={collectAll}
                />
            );
            break;
    }

    return control;
};

export default GameControl;
