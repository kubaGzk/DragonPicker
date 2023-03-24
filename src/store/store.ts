import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import gameStatusReducer from "./gameStatus";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gameStatus: gameStatusReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
