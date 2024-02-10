import { configureStore } from "@reduxjs/toolkit";
import toggleProfileSlice from "./toggleProfileSlice";

const greenMindsStore=configureStore({
    reducer:{
        toggleProfile: toggleProfileSlice.reducer,
    }
});
export default greenMindsStore;