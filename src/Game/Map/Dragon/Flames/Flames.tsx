import { FC } from "react";
import FlameBlow from "./FlameBlow/FlameBlow";
import { Winner } from "../../../../types";

interface FlamesProps {
    onComplete: (id: string, ind: number) => void;
    winners: Winner[];
    gridElHeight: number;
    flameX: number;
}

const Flames: FC<FlamesProps> = (props) => {
    const { winners, gridElHeight, onComplete, flameX } = props;

    return (
        <>
            {winners.map((win, ind) => {
                return (
                    <FlameBlow
                        x={win.x}
                        y={win.y}
                        key={win.x}
                        onComplete={() => onComplete(win.id, ind)}
                        gridElHeight={gridElHeight}
                        flameX={flameX}
                    />
                );
            })}
        </>
    );
};

export default Flames;
