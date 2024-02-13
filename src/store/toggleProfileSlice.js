import { createSlice } from "@reduxjs/toolkit";

const toggleProfileSlice = createSlice({
    name: "toggleProfile",
    initialState: {
        Login: true,
    },
    reducers: {
        loginDone: (state) => {
            state.Login = true;
        },
    }
});
export const profileAction = toggleProfileSlice.actions;
export default toggleProfileSlice;