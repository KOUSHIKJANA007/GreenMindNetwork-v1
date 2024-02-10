import { createSlice } from "@reduxjs/toolkit";

const toggleProfileSlice = createSlice({
    name: "toggleProfile",
    initialState: {
        Login: false,
    },
    reducers: {
        loginDone: (state) => {
            state.Login = true;
        },
    }
});
export const profileAction = toggleProfileSlice.actions;
export default toggleProfileSlice;