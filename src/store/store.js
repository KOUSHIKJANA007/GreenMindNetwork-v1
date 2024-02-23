import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetails from "./userDetails";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    user: userDetails
})
const persistedReducer = persistReducer(persistConfig, reducer);
const greenMindStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})


export const persistor = persistStore(greenMindStore);
export default greenMindStore