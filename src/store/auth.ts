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
    },
});

export const { login, completeLoading, decreaseWallet, increaseWallet } =
    authSlice.actions;

export default authSlice.reducer;
