import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
    name: "fetchStatus",
    initialState: {
        fetchDone: false,
        fetching: false,
    },
    reducers: {
        FetchDone: (state) => {
            state.fetchDone = true;
        },
        FetchStarted: (state) => {
            state.fetching = true;
        },
        FetchEnded: (state) => {
            state.fetching = false;
        },
    }
})

export const fetchAction = fetchSlice.actions;
export default fetchSlice;