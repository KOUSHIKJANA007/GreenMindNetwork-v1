import { configureStore } from "@reduxjs/toolkit";
import toggleProfileSlice from "./toggleProfileSlice";
import fetchSlice from "./fetchSlice";
import articleSlice from "./articleSlice";

const greenMindsStore=configureStore({
    reducer:{
        toggleProfile: toggleProfileSlice.reducer,
        fetchStatus:fetchSlice.reducer,
        article:articleSlice.reducer
    }
});
export default greenMindsStore;