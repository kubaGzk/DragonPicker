import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameStatusState {
    username: string;
    isAuth: boolean;
    loading: boolean;
    localUsername: string;
    localCoins: number;
    hasLocalUser: boolean;
    assetsLoaded: boolean;
}

const initialState: GameStatusState = {
    username: "",
    isAuth: false,
    loading: true,
    localUsername: "",
    localCoins: 0,
    hasLocalUser: false,
    assetsLoaded: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        localCheck: (state) => {
            const username = localStorage.getItem("GAME_Username");
            const coins = parseInt(localStorage.getItem("GAME_Coins") || "");

            if (username && username.length > 0 && coins > 0) {
                return {
                    ...state,
                    loading: false,
                    localUsername: username,
                    localCoins: coins,
                    hasLocalUser: true,
                };
            }

            return {
                ...state,
                loading: false,
                localUsername: "",
                localCoins: 0,
                hasLocalUser: false,
            };
        },
        login: (state, action: PayloadAction<{ username: string }>) => {
            const { username } = action.payload;

            localStorage.setItem("GAME_Username", username);

            return {
                ...state,
                username,
                isAuth: true,
            };
        },
        clearLocalUser: (state) => {
            return {
                ...state,
                localUsername: "",
                localCoins: 0,
                hasLocalUser: false,
            };
        },
        finishGameAuth: () => {
            return { ...initialState, loading: false };
        },
    },
});

export const { localCheck, login, clearLocalUser, finishGameAuth } =
    authSlice.actions;

export default authSlice.reducer;
