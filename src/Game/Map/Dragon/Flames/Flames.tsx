import { FC } from "react";
import FlameBlow from "./FlameBlow/FlameBlow";

interface FlamesProps {
    removeBlowHandler: (x: number) => void;
    winnersPosition: { x: number; y: number }[];
    gridElHeight: number;
    flameX: number;
}

const Flames: FC<FlamesProps> = (props) => {
    const { winnersPosition, gridElHeight, removeBlowHandler, flameX } = props;

    return (
        <>
            {winnersPosition.map((win) => {
                return (
                    <FlameBlow
                        x={win.x}
                        y={win.y}
                        key={win.x}
                        onComplete={() => removeBlowHandler(win.x)}
                        gridElHeight={gridElHeight}
                        flameX={flameX}
                    />
                );
            })}
        </>
    );
};

export default Flames;
