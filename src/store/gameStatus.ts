import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateGrid, selectWinners } from "../utils";
import { GridElement } from "../types";

type Level = 1 | 2 | 3;

export interface GameStatusState {
    levelSelected: Level | null;
    inPlay: boolean;
    gridElements: GridElement[];
    gridElWidth: number;
    gridElHeight: number;
    minStake: number;
    maxStake: number;
    bidAmount: number;
    winnersPosition: { x: number; y: number }[];
}

const initialState: GameStatusState = {
    levelSelected: null,
    inPlay: false,
    gridElements: [],
    gridElWidth: 0,
    gridElHeight: 0,
    minStake: 0,
    maxStake: 100,
    bidAmount: 10,
    winnersPosition: [],
};

const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState,
    reducers: {
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

            return { ...state, gridElements: newGridElements };
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

            return { ...state, gridElements: newGridElements };
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
            const { winners, winnersPosition } = selectWinners(
                state.levelSelected!,
                state.gridElements,
            );

            return { ...state, inPlay: true, winnersPosition: winnersPosition };
        },
        endGame: (state) => {
            return { ...state, inPlay: false, winnersPosition: [] };
        },
        removeWinnersPoistion: (
            state,
            action: PayloadAction<{ x: number }>,
        ) => {
            const { x } = action.payload;

            const newPostion = state.winnersPosition.filter((el) => el.x !== x);

            return { ...state, winnersPosition: newPostion };
        },
    },
});

export const {
    selectLevel,
    recalculateGrid,
    increaseBid,
    decreaseBid,
    setStakes,
    quitLevel,
    startGame,
    endGame,
    removeWinnersPoistion,
} = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
