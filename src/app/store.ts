import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./moviesApi";
import { authApi } from "./authApi";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: 
        (getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(moviesApi.middleware)
            .concat(authApi.middleware)
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];