import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetails from "./userDetails";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postDetails from "./postDetails";
import commentDetails from "./commentDetails";
import donationDetails from "./donationDetails";
import validationSlice from './OtpValidation'
import ngoDetails from "./ngoDetails";
import eventDetails from "./eventDetails";
import socialImageDetails from "./socialImageDetails";
import bankDetails from "./bankDetails";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
  user: userDetails,
  post: postDetails,
  comment: commentDetails,
  donation: donationDetails,
  validation: validationSlice,
  ngo: ngoDetails,
  event: eventDetails,
  socialPost: socialImageDetails,
  bank: bankDetails,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const greenMindStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})


export const persistor = persistStore(greenMindStore);
export default greenMindStore