import { FC } from "react";
import GridElement from "../GridElement/GridElement";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { decreaseBid, increaseBid } from "../../../store/gameStatus";

interface GridProps {}

const Grid: FC<GridProps> = (props) => {
    const {
        gridElWidth,
        gridElHeight,
        gridElements,
        inPlay,
        bidAmount,
        minStake,
        maxStake,
        coins,
    } = useAppSelector((state) => state.gameStatus);

    const dispatch = useAppDispatch();

    const increaseHandler = (id: string, value: number) => {
        if (coins - bidAmount >= 0 && value + bidAmount <= maxStake) {
            dispatch(increaseBid({ id }));
        }
    };
    const decreaseHandler = (id: string, value: number) => {
        if (value - bidAmount >= minStake) {
            dispatch(decreaseBid({ id }));
        }
    };

    // const collectHandler = (id: string) =>{
    //     dispatch(collectW)
    // }

    return (
        <>
            {gridElements.map((el) => {
                return (
                    <GridElement
                        minStake={minStake}
                        maxStake={maxStake}
                        currValue={el.value}
                        x={el.x}
                        y={el.y}
                        elWidth={gridElWidth}
                        elHeight={gridElHeight}
                        inPlay={inPlay}
                        key={el.id}
                        onIncrease={() => increaseHandler(el.id, el.value)}
                        onDecrease={() => decreaseHandler(el.id, el.value)}
                        collectable={el.collectable}
                    />
                );
            })}
        </>
    );
};

export default Grid;
