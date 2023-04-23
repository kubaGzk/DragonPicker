import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LeaderboardItem } from "../types";

export interface MenuState {
    menuOn: boolean;
    saveMenuOn: boolean;
    confirmMenuOn: boolean;
    leaderboardLoading: boolean;
    leaderboardOn: boolean;
    leaderboard: LeaderboardItem[];
    leaderboardError: boolean;
    endingGame: boolean;
}

const initialState: MenuState = {
    menuOn: false,
    saveMenuOn: false,
    confirmMenuOn: false,
    leaderboardLoading: false,
    leaderboardOn: false,
    leaderboard: [],
    leaderboardError: false,
    endingGame: false,
};

export const fetchLeaderboard = createAsyncThunk(
    "menu/fetchLeaderboard",
    async () => {
        const res = await axios(process.env.REACT_APP_API_URL!);

        const data = await res.data;

        const items: { username: string; coins: number; index: number }[] =
            Object.keys(data)
                .map((key) => {
                    const { username, coins } = data[key];

                    return { username, coins: parseInt(coins) };
                })
                .sort((a, b) => b.coins - a.coins)
                .map((el, ind) => ({ ...el, index: ind + 1 }));

        return items;
    },
);

export const postScore = createAsyncThunk(
    "menu/postScore",
    async (payload: { username: string; coins: number }) => {
        const { username, coins } = payload;

        const res = await axios.post(process.env.REACT_APP_API_URL!, {
            username,
            coins,
        });
        const data = await res.data;
        return data;
    },
);

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        turnMenuOn: (state) => {
            return { ...state, menuOn: true };
        },
        turnMenuOff: (state) => {
            return { ...state, menuOn: false };
        },
        turnSaveMenuOn: (state) => {
            return { ...state, saveMenuOn: true, menuOn: false };
        },
        turnSaveMenuOff: (state) => {
            return { ...state, saveMenuOn: false, menuOn: true };
        },
        closeLeaderboard: (state) => {
            return { ...state, leaderboardOn: false, menuOn: true };
        },
        clearError: (state) => {
            return { ...initialState, menuOn: true, leaderboardError: false };
        },
        finishGameMenu: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaderboard.pending, (state) => {
            state.menuOn = false;
            state.saveMenuOn = false;
            state.leaderboard = [];
            state.leaderboardLoading = true;
        });
        builder.addCase(
            fetchLeaderboard.fulfilled,
            (state, action: PayloadAction<LeaderboardItem[]>) => {
                state.leaderboardLoading = false;
                state.leaderboard = action.payload;
                state.leaderboardOn = true;
            },
        );
        builder.addCase(fetchLeaderboard.rejected, (state, action) => {
            state.leaderboardLoading = false;
            state.leaderboard = [];
            state.leaderboardError = !!action.error.message;
        });

        builder.addCase(postScore.pending, (state) => {
            state.saveMenuOn = false;
            state.leaderboardLoading = true;
        });
        builder.addCase(postScore.fulfilled, (state) => {
            state.leaderboardLoading = false;
            state.confirmMenuOn = true;
            state.endingGame = true;

            localStorage.removeItem("GAME_Username");
            localStorage.removeItem("GAME_Coins");
        });
        builder.addCase(postScore.rejected, (state, action) => {
            state.leaderboardLoading = false;
            state.leaderboardError = !!action.error.message;
            console.log(action.error.message);
        });
    },
});

export const {
    turnMenuOn,
    turnMenuOff,
    turnSaveMenuOn,
    turnSaveMenuOff,
    closeLeaderboard,
    clearError,
    finishGameMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
