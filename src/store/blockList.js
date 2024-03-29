import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const blockUser = createAsyncThunk("blockUser", async (userId) => {
  const response = await fetch(
    `http://localhost:8080/api/user/block/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
});
export const unBlockUser = createAsyncThunk("unBlockUser", async (userId) => {
  const response = await fetch(
    `http://localhost:8080/api/user/unblock/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
});

const blockList = createSlice({
  name: "blockList",
  initialState: {
    isBlocked: false,
  },
  reducers: {
    setBlockeStatus:(state)=>{
      state.isBlocked=true;
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
