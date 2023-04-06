import { FC } from "react";
import GridElement from "../GridElement/GridElement";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { decreaseBid, increaseBid } from "../../../store/gameStatus";
import { decreaseWallet, increaseWallet } from "../../../store/auth";

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
    } = useAppSelector((state) => state.gameStatus);

    const { coins } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    const increaseHandler = (id: string, value: number) => {
        if (coins - bidAmount >= 0 && value + bidAmount <= maxStake) {
            dispatch(increaseBid({ id }));
            dispatch(decreaseWallet({ stake: bidAmount }));
        }
    };
    const decreaseHandler = (id: string, value: number) => {
        if (value - bidAmount >= minStake) {
            dispatch(decreaseBid({ id }));
            dispatch(increaseWallet({ returnedCoins: bidAmount }));
        }
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
                        inPlay={inPlay}
                        key={el.id}
                        onIncrease={() => increaseHandler(el.id, el.value)}
                        onDecrease={() => decreaseHandler(el.id, el.value)}
                    />
                );
            })}
        </>
    );
};

export default Grid;
