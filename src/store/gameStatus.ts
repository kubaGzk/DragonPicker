import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    calculateGrid,
    selectCollectables,
    selectWinElement,
    selectWinners,
} from "../utils";
import { GridElement, Level, Winner } from "../types";

export interface GameStatusState {
    username: string;
    coins: number;
    isAuth: boolean;
    loading: boolean;
    levelSelected: Level | null;
    inPlay: boolean;
    isCollect: boolean;
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
    username: "",
    coins: 0,
    isAuth: false,
    loading: true,
    levelSelected: null,
    inPlay: false,
    isCollect: false,
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
        login: (
            state,
            action: PayloadAction<{ username: string; coins?: number }>,
        ) => {
            const { username, coins } = action.payload;

            const validCoins = coins || 1000;

            localStorage.setItem("GAME_Username", username);
            localStorage.setItem("GAME_Coins", validCoins.toString());

            return {
                ...state,
                username,
                coins: validCoins,
                isAuth: true,
                loading: false,
            };
        },
        completeLoading: (state) => {
            return { ...state, loading: false };
        },
        decreaseWallet: (state, action: PayloadAction<{ stake: number }>) => {
            const { stake } = action.payload;

            if (state.coins - stake < 0) {
                return state;
            }

            return { ...state, coins: state.coins - stake };
        },

        increaseWallet: (
            state,
            action: PayloadAction<{ returnedCoins: number }>,
        ) => {
            const { returnedCoins } = action.payload;

            return { ...state, coins: state.coins + returnedCoins };
        },

        selectLevel: (
            state,
            action: PayloadAction<{
                level: Level;
                width: number;
                height: number;
            }>,
        ) => {
            const { level, width, height } = action.payload;

            const { gridElWidth, gridElHeight, gridElements } = calculateGrid(
                level,
                width,
                height,
            );

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
                width: number;
                height: number;
            }>,
        ) => {
            const { width, height } = action.payload;

            if (state.levelSelected) {
                const { gridElWidth, gridElHeight, gridElements } =
                    calculateGrid(state.levelSelected, width, height);

                const updatedElements = gridElements.map((el) => {
                    const lookInd = state.gridElements.findIndex(
                        (stateEl) => stateEl.id === el.id,
                    );

                    return { ...el, value: state.gridElements[lookInd].value };
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
                coins: state.coins - state.bidAmount,
            };
        },

        setStakes: (
            state,
            action: PayloadAction<{ minStake: number; maxStake: number }>,
        ) => {
            const { minStake, maxStake } = action.payload;

            return { ...state, minStake, maxStake };
        },

        quitLevel: () => {
            return { ...initialState };
        },

        startGame: (state) => {
            const { winners } = selectWinners(
                state.levelSelected!,
                state.gridElements,
            );

            const newGridElements = state.gridElements.map((el) => {
                const ind = winners.findIndex((win) => win.id === el.id);

                if (ind >= 0) {
                    return { ...el, winner: true };
                }
                return el;
            });

            return {
                ...state,
                inPlay: true,
                winners,
                gridElements: newGridElements,
            };
        },
        endGame: (state) => {
            return {
                ...state,
                inPlay: false,
                winners: [],
                isCollect: true,
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
        collectWin: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            const { newGridElements, itemsToCollect, collectedWin } =
                selectWinElement(id, state.gridElements);

            return {
                ...state,
                gridElements: newGridElements,
                itemsToCollect,
                coins: state.coins + collectedWin,
                isCollect: itemsToCollect,
            };
        },
    },
});

export const {
    login,
    completeLoading,
    decreaseWallet,
    increaseWallet,
    selectLevel,
    recalculateGrid,
    increaseBid,
    decreaseBid,
    setStakes,
    quitLevel,
    startGame,
    endGame,
    setCollectable,
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
