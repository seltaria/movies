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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;