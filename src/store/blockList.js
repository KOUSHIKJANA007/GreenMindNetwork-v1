import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./helper";
export const blockUser = createAsyncThunk("blockUser", async (userId) => {
  const response = await fetch(BASE_URL + `/api/user/block/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const unBlockUser = createAsyncThunk("unBlockUser", async (userId) => {
  const response = await fetch(BASE_URL + `/api/user/unblock/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

const blockList = createSlice({
  name: "blockList",
  initialState: {
    isBlocked: false,
  },
  reducers: {
    setBlockeStatus:(state)=>{
      state.isBlocked="";
    },
    setUnBlockeStatus:(state)=>{
      state.isBlocked=false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(blockUser.pending, (state, action) => {});
    builder.addCase(blockUser.fulfilled, (state, action) => {});
    builder.addCase(blockUser.rejected, (state, action) => {});
    builder.addCase(unBlockUser.pending, (state, action) => {});
    builder.addCase(unBlockUser.fulfilled, (state, action) => {});
    builder.addCase(unBlockUser.rejected, (state, action) => {});
  },
});
export const blockListAction = blockList.actions;
export default blockList.reducer;
