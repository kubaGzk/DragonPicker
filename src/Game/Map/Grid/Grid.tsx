import { FC } from "react";
import { calculateGrid } from "../../../utils";
import GridElement from "../GridElement/GridElement";

interface GridProps {
    width: number;
    height: number;
}

const Grid: FC<GridProps> = (props) => {
    const { width, height } = props;

    const { gridElWidth, gridElHeight, gridPositions } = calculateGrid(
        1,
        width,
        height,
    );

    return <>{gridPositions.map((el) => {
        return (
            <GridElement
                minStake={0}
                maxStake={100}
                currValue={100}
                x={el.x}
                y={el.y}
                elWidth={gridElWidth}
                elHeight={gridElHeight}
                inPlay={false}
            />
        );
    })}</>;
};

export default Grid;
