import { createSlice } from "@reduxjs/toolkit";

const adminFunctions = createSlice({
  name: "adminFunctions",
  initialState:{
    toggleNav:1
  },
  reducers:{
    setUserToggleNav:(state)=>{
        state.toggleNav=1;
    },
    setNgoToggleNav:(state)=>{
        state.toggleNav=2;
    },
  }
});
export const adminAction=adminFunctions.actions;
export default adminFunctions.reducer;