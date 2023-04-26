import { FC } from "react";
import GridElement from "../GridElement/GridElement";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
    collectWinElement,
    decreaseBid,
    increaseBid,
} from "../../../store/gameStatus";

interface GridProps {
    scale: number;
    turnPointerOnHandler: () => void;
    turnPointerOffHandler: () => void;
}

const Grid: FC<GridProps> = (props) => {
    const { scale, turnPointerOnHandler, turnPointerOffHandler } = props;

    const {
        gridElWidth,
        gridElHeight,
        gridElements,
        currentStatus,
        bidAmount,
        minStake,
        maxStake,
        coins,
        levelSelected,
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

    const collectHandler = (id: string) => {
        dispatch(collectWinElement({ id }));
    };

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
                        currentStatus={currentStatus}
                        key={el.id}
                        onIncrease={() => increaseHandler(el.id, el.value)}
                        onDecrease={() => decreaseHandler(el.id, el.value)}
                        collectable={el.collectable}
                        onCollect={() => collectHandler(el.id)}
                        levelSelected={levelSelected}
                        scale={scale}
                        turnPointerOnHandler={turnPointerOnHandler}
                        turnPointerOffHandler={turnPointerOffHandler}
                    />
                );
            })}
        </>
    );
};

export default Grid;
