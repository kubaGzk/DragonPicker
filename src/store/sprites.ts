import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Spritesheet } from "pixi.js";
import { SpritesState } from "../assetLoader";

export interface GameStatusState {
    dragon: Spritesheet | null;
    button: Spritesheet | null;
    level: Spritesheet | null;
    gameControl: Spritesheet | null;
    menuItems: Spritesheet | null;
}

const initialState: GameStatusState = {
    dragon: null,
    button: null,
    level: null,
    gameControl: null,
    menuItems: null,
};

const spritesSlice = createSlice({
    name: "sprites",
    initialState,
    reducers: {
        setSprites: (state, action: PayloadAction<SpritesState>) => {
            return { ...action.payload };
        },
    },
});

export const { setSprites } = spritesSlice.actions;

export default spritesSlice.reducer;
