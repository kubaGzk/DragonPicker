import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    username: string;
    coins: number;
    isAuth: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    username: "",
    coins: 0,
    isAuth: false,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
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
                username,
                coins: validCoins,
                isAuth: true,
                loading: false,
            };
        },
        completeLoading: (state) => {
            return { ...state, loading: false };
        },
    },
});

export const { login, completeLoading } = authSlice.actions;

export default authSlice.reducer;
