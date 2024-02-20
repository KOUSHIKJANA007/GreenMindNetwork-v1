import { createSlice } from "@reduxjs/toolkit";

const toggleProfileSlice = createSlice({
    name: "toggleProfile",
    initialState: {
        Login: false,
    },
    reducers: {
        loginDone: (state,action) => {
            state.Login = true;
            localStorage.setItem("data",JSON.stringify(action.payload))
        },
        logoutDone: (state) => {
            localStorage.removeItem("data");
            state.Login = false;
           
        },
    }
});
export const profileAction = toggleProfileSlice.actions;
export default toggleProfileSlice;