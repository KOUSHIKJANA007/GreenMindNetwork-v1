import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./helper";

export const getAllMessage = createAsyncThunk("getAllMessage", async () => {
  let response = await fetch(BASE_URL + `/message/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const getMessageByUser = createAsyncThunk("getMessageByUser", async () => {
  let response = await fetch(BASE_URL + `/message/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    message_user: [],
    admin_message: [],
    chat_user_data: null,
    user_chat_message: [],
  },
  reducers: {
    setMessageUser: (state, action) => {
      state.message_user.push(action.payload);
    },
    setAdminMessage: (state, action) => {
      state.admin_message.push(action.payload);
    },
    setUserChatMessage: (state, action) => {
      state.user_chat_message.push(action.payload);
    },
    setChatUserData: (state, action) => {
      state.chat_user_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessage.pending, (state) => {});
    builder.addCase(getAllMessage.fulfilled, (state) => {});
    builder.addCase(getAllMessage.rejected, (state) => {});
    builder.addCase(getMessageByUser.pending, (state) => {});
    builder.addCase(getMessageByUser.fulfilled, (state) => {});
    builder.addCase(getMessageByUser.rejected, (state) => {});
  },
});

export const messageAction = messageSlice.actions;
export default messageSlice.reducer;
