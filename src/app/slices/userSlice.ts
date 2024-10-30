import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthOpen: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        openAuth: (state) => {
            state.isAuthOpen = true;
        },
        closeAuth: (state) => {
            state.isAuthOpen = false;
        },
    },
});

export const {
    openAuth,
    closeAuth,
} = userSlice.actions;
export {userSlice};