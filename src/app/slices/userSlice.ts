import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload)
        }
    },
});

export const {
    addFavorite
} = userSlice.actions;
export {userSlice};