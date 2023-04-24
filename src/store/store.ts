import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import gameStatusReducer from "./gameStatus";
import menuReducer from "./menu";
import spritesReducer from "./sprites";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gameStatus: gameStatusReducer,
        menu: menuReducer,
        // sprites: spritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
