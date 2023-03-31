import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Level = 1 | 2 | 3;

export interface GameStatusState {
    levelSelected: Level | null;
    inPlay: boolean;
}

const initialState: GameStatusState = {
    levelSelected: null,
    inPlay: false,
};

const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState,
    reducers: {
        selectLevel: (state, action: PayloadAction<{ level: Level }>) => {
            const { level } = action.payload;

            return { ...state, levelSelected: level };
        },
        quitLevel: (state) => {
            return { ...state, levelSelected: null };
        },

        startGame: (state) => {
            return { ...state, inPlay: true };
        },
        endGame: (state) => {
            return { ...state, inPlay: false };
        },
    },
});

export const { selectLevel } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
