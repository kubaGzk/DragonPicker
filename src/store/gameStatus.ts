import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameStatusState {
    levelSelected: string | null;
}

const initialState: GameStatusState = {
    levelSelected: null,
};

const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState,
    reducers: {
        selectLevel: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            return { levelSelected: id };
        },
    },
});

export const { selectLevel } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
