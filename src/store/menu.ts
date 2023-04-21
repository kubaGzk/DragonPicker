import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
    menuOn: boolean;
    saveMenuOn: boolean;
    leaderboardLoading: boolean;
    leaderboardOn: boolean;
    leaderboard: [];
    leaderboardError: boolean;
    endingGame: boolean;
}

const initialState: MenuState = {
    menuOn: false,
    saveMenuOn: false,
    leaderboardLoading: false,
    leaderboardOn: false,
    leaderboard: [],
    leaderboardError: false,
    endingGame: false,
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
        turnSaveMenuOn: (state) => {
            return { ...state, saveMenuOn: true, menuOn: false };
        },
        turnSaveMenuOff: (state) => {
            return { ...state, saveMenuOn: false, menuOn: true };
        },
        startLoading: (
            state,
            action: PayloadAction<{ endingGame?: boolean }>,
        ) => {
            const { endingGame } = action.payload;

            return {
                ...state,
                menuOn: false,
                saveMenuOn: false,
                leaderboardLoading: true,
                leaderboard: [],
                endingGame: !!endingGame,
            };
        },
        finishLoading: (state, action: PayloadAction<{ leaderboard: [] }>) => {
            const { leaderboard } = action.payload;

            return {
                ...state,
                leaderboardLoading: false,
                leaderboardOn: true,
                leaderboard: leaderboard,
            };
        },
        closeLeaderboard: (state) => {
            return { ...state, leaderboardOn: false, menuOn: true };
        },

        setError: (state) => {
            return {
                ...state,
                leaderboardLoading: false,
                leaderboardOn: false,
                leaderboard: [],
                leaderboardError: true,
            };
        },
        clearError: (state) => {
            return { ...initialState, menuOn: true, leaderboardError: false };
        },
        finishGameMenu: (state) => {
            return initialState;
        },
    },
});

export const {
    turnMenuOn,
    turnMenuOff,
    turnSaveMenuOn,
    turnSaveMenuOff,
    startLoading,
    finishLoading,
    closeLeaderboard,
    setError,
    clearError,
    finishGameMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
