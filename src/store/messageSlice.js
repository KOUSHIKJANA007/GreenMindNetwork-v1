import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";

export const getAllMessage = createAsyncThunk("getAllMessage", async () => {
  let response = await fetch(BASE_URL + `/message/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const getMessageByUser = createAsyncThunk(
  "getMessageByUser",
  async () => {
    let response = await fetch(BASE_URL + `/message/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
export const deleteAllChat = createAsyncThunk(
  "deleteAllChat",
  async (userId) => {
    let token = localStorageWithExpiry.getItem("token");
    let response = await fetch(BASE_URL + `/message/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
    });
    return await response.json();
  }
);

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    loading: false,
    message_user: [],
    admin_message: [],
    chat_user_data: null,
    user_chat_message: [],
    isDeleteChat: false,
    progress: 10,
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
    setDeleteStart: (state) => {
      state.isDeleteChat = true;
    },
    setDeleteEnd: (state) => {
      state.isDeleteChat = false;
    },
    setProgress: (state,action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessage.pending, (state) => {});
    builder.addCase(getAllMessage.fulfilled, (state) => {});
    builder.addCase(getAllMessage.rejected, (state) => {});
    builder.addCase(getMessageByUser.pending, (state) => {});
    builder.addCase(getMessageByUser.fulfilled, (state) => {});
    builder.addCase(getMessageByUser.rejected, (state) => {});
    builder.addCase(deleteAllChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAllChat.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAllChat.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const messageAction = messageSlice.actions;
export default messageSlice.reducer;
