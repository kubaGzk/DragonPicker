import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    // calculateGrid,
    selectCollectables,
    getWinElement,
    selectWinners,
    getAllWinElements,
    newCalculateGrid,
} from "../utils";
import { CurrentStatus, GridElement, Winner } from "../types";

export interface GameStatusState {
    coins: number;
    levelSelected: number;
    currentStatus: CurrentStatus;
    gridElements: GridElement[];
    gridElWidth: number;
    gridElHeight: number;
    minStake: number;
    maxStake: number;
    bidAmount: number;
    winners: Winner[];
    totalWin: number;
    itemsToCollect: boolean;
}

const initialState: GameStatusState = {
    coins: 0,
    levelSelected: 0,
    currentStatus: CurrentStatus.Start,
    gridElements: [],
    gridElWidth: 0,
    gridElHeight: 0,
    minStake: 0,
    maxStake: 100,
    bidAmount: 10,
    winners: [],
    totalWin: 0,
    itemsToCollect: false,
};

const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState,
    reducers: {
        addCoins: (state, action: PayloadAction<{ coins: number }>) => {
            const { coins } = action.payload;

            localStorage.setItem("GAME_Coins", coins.toString());

            return {
                ...state,
                coins,
            };
        },
        completeLoading: (state) => {
            return { ...state, loading: false };
        },

        selectLevel: (
            state,
            action: PayloadAction<{
                level: number;
                scale: number;
            }>,
        ) => {
            const { level, scale } = action.payload;

            const { gridElWidth, gridElHeight, gridElements } =
                newCalculateGrid(level, scale);

            return {
                ...state,
                levelSelected: level,
                gridElWidth,
                gridElHeight,
                gridElements,
            };
        },
        recalculateGrid: (
            state,
            action: PayloadAction<{
                scale: number;
            }>,
        ) => {
            const { scale } = action.payload;

            if (state.levelSelected !== 0) {
                const { gridElWidth, gridElHeight, gridElements } =
                    newCalculateGrid(state.levelSelected, scale);

                const updatedElements = gridElements.map((el) => {
                    const lookInd = state.gridElements.findIndex(
                        (stateEl) => stateEl.id === el.id,
                    );

                    return {
                        ...el,
                        value: state.gridElements[lookInd].value,
                        winner: state.gridElements[lookInd].winner,
                        collectable: state.gridElements[lookInd].collectable,
                    };
                });

                return {
                    ...state,
                    gridElWidth,
                    gridElHeight,
                    gridElements: updatedElements,
                };
            }

            return state;
        },
        increaseBid: (state, action: PayloadAction<{ id: string }>) => {
            if (
                state.currentStatus === CurrentStatus.Play ||
                state.currentStatus === CurrentStatus.Collect
            )
                return state;

            const { id } = action.payload;

            const newGridElements = state.gridElements.map((el) => {
                if (
                    el.id === id &&
                    el.value + state.bidAmount <= state.maxStake
                ) {
                    return { ...el, value: el.value + state.bidAmount };
                } else {
                    return el;
                }
            });

            return {
                ...state,
                gridElements: newGridElements,
                coins: state.coins - state.bidAmount,
            };
        },
        decreaseBid: (state, action: PayloadAction<{ id: string }>) => {
            if (
                state.currentStatus === CurrentStatus.Play ||
                state.currentStatus === CurrentStatus.Collect
            )
                return state;

            const { id } = action.payload;

            const newGridElements = state.gridElements.map((el) => {
                if (
                    el.id === id &&
                    el.value - state.bidAmount >= state.minStake
                ) {
                    return { ...el, value: el.value - state.bidAmount };
                } else {
                    return el;
                }
            });

            return {
                ...state,
                gridElements: newGridElements,
                coins: state.coins + state.bidAmount,
            };
        },

        setStakes: (
            state,
            action: PayloadAction<{ minStake: number; maxStake: number }>,
        ) => {
            const { minStake, maxStake } = action.payload;

            return { ...state, minStake, maxStake };
        },

        startGame: (state) => {
            const { winners } = selectWinners(
                state.levelSelected!,
                state.gridElements,
            );

            const validCoins = state.coins;

            localStorage.setItem("GAME_Coins", validCoins.toString());

            const newGridElements = state.gridElements.map((el) => {
                const ind = winners.findIndex((win) => win.id === el.id);

                if (ind >= 0) {
                    return { ...el, winner: true };
                }
                return el;
            });

            return {
                ...state,
                currentStatus: CurrentStatus.Play,
                winners,
                gridElements: newGridElements,
            };
        },
        endGame: (state) => {
            return {
                ...state,
                currentStatus: CurrentStatus.Collect,
            };
        },

        setCollectable: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            const { newGridElements, win, itemsToCollect } = selectCollectables(
                id,
                state.gridElements,
            );

            return {
                ...state,
                gridElements: newGridElements,
                totalWin: state.totalWin + win,
                itemsToCollect: state.itemsToCollect || itemsToCollect,
            };
        },
        collectWinElement: (state, action: PayloadAction<{ id: string }>) => {
            if (state.currentStatus === CurrentStatus.Play) return state;

            const { id } = action.payload;

            const { newGridElements, itemsToCollect, collectedWin } =
                getWinElement(id, state.gridElements);

            let updatedElements = newGridElements;

            if (!itemsToCollect) {
                updatedElements = newGridElements.map((el) => ({
                    ...el,
                    value: 0,
                }));
            }

            const validCoins = state.coins + collectedWin;
            localStorage.setItem("GAME_Coins", validCoins.toString());

            return {
                ...state,
                gridElements: updatedElements,
                itemsToCollect,
                coins: state.coins + collectedWin,
                currentStatus: itemsToCollect
                    ? CurrentStatus.Collect
                    : CurrentStatus.Start,
                winners: itemsToCollect ? state.winners : [],
                totalWin: itemsToCollect ? state.totalWin : 0,
            };
        },
        collectAllWinElements: (state) => {
            const { newGridElements, collectedWin } = getAllWinElements(
                state.gridElements,
            );

            const validCoins = state.coins + collectedWin;
            localStorage.setItem("GAME_Coins", validCoins.toString());

            return {
                ...state,
                gridElements: newGridElements,
                itemsToCollect: false,
                coins: state.coins + collectedWin,
                currentStatus: CurrentStatus.Start,
                winners: [],
                totalWin: 0,
            };
        },
        quitLevel: (state) => {
            if (state.currentStatus === CurrentStatus.Start) {
                return { ...initialState, coins: state.coins };
            }
        },
        finishGameGameStatus: () => {
            return initialState;
        },
    },
});

export const {
    addCoins,
    selectLevel,
    recalculateGrid,
    increaseBid,
    decreaseBid,
    setStakes,
    quitLevel,
    startGame,
    endGame,
    setCollectable,
    collectWinElement,
    collectAllWinElements,
    finishGameGameStatus,
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
