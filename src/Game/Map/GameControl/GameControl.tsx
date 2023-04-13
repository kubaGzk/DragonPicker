import { FC, ReactNode, useMemo } from "react";
import { CurrentStatus } from "../../../types";
import Dragon from "../Dragon/Dragon";
import { Text } from "@pixi/react";
import { startStyle, endGameStyle } from "../../../styles";
import { OutlineFilter } from "@pixi/filter-outline";

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
                <Text
                    text={"Start Game"}
                    style={startStyle}
                    x={width * 0.8}
                    y={height / 2}
                    width={150}
                    interactive={true}
                    onclick={startGame}
                    anchor={{ x: 0, y: 0.5 }}
                    filters={[outlineFilter]}
                />
            );
            break;

        case CurrentStatus.Play:
            control = <Dragon width={width} height={height} />;
            break;
        case CurrentStatus.Collect:
            control =
                totalWin > 0 ? (
                    <>
                        <Text
                            text={`You won ${totalWin} coins`}
                            style={endGameStyle}
                            x={width * 0.8}
                            y={height / 3}
                            width={150}
                            filters={[outlineFilter]}
                        />
                        <Text
                            text={"Collect your win"}
                            style={endGameStyle}
                            x={width * 0.8}
                            y={(height * 2) / 3}
                            width={150}
                            interactive={true}
                            onclick={collectAll}
                            filters={[outlineFilter]}
                        />
                    </>
                ) : (
                    <>
                        <Text
                            text={`Try again, you won 0 coins`}
                            style={endGameStyle}
                            x={width * 0.8}
                            y={height / 3}
                            width={150}
                            interactive={true}
                            onclick={collectAll}
                            filters={[outlineFilter]}
                        />
                        <Text
                            text={"Finish the game"}
                            style={endGameStyle}
                            x={width * 0.8}
                            y={(height * 2) / 3}
                            width={150}
                            interactive={true}
                            onclick={collectAll}
                            filters={[outlineFilter]}
                        />
                    </>
                );
            break;
    }

    return control;
};

export default GameControl;
