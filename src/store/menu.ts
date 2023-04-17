import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
    menuOn: boolean;
}

const initialState: MenuState = {
    menuOn: false,
};

const menuSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        turnMenuOn: (state) => {
            return { ...state, menuOn: true };
        },
        turnMenuOff: (state) => {
            return { ...state, menuOn: false };
        },
    },
});

export const { turnMenuOn, turnMenuOff } = menuSlice.actions;

export default menuSlice.reducer;
