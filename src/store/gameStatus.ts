import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    calculateGrid,
    selectCollectables,
    getWinElement,
    selectWinners,
    getAllWinElements,
} from "../utils";
import { CurrentStatus, GridElement, Winner } from "../types";

export interface GameStatusState {
    username: string;
    coins: number;
    isAuth: boolean;
    loading: boolean;
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
    menuOn: boolean;
}

const initialState: GameStatusState = {
    username: "",
    coins: 0,
    isAuth: false,
    loading: true,
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
    menuOn: false,
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

        selectLevel: (
            state,
            action: PayloadAction<{
                level: number;
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

            if (state.levelSelected !== 0) {
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
            if (state.currentStatus === CurrentStatus.Play) return state;

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
            if (state.currentStatus === CurrentStatus.Play) return state;

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

        quitLevel: () => {
            return { ...initialState };
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

        turnMenuOn: (state) => {
            return { ...state, menuOn: true };
        },
        turnMenuOff: (state) => {
            return { ...state, menuOn: false };
        },
    },
});

export const {
    login,
    completeLoading,
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
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
