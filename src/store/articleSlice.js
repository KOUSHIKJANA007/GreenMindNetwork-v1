import { createSlice } from "@reduxjs/toolkit";

const articleSlice=createSlice({
  name:"article",
  initialState:[],
  reducers:{
    addInitialArticle:(state,action)=>{
        return action.payload;
    }
  }
});

export const articleAction=articleSlice.actions;
export default articleSlice;