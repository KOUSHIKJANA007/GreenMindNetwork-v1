import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";

export const createUser = createAsyncThunk("createUser", async (data) => {
  const response = await fetch(BASE_URL + "/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});
export const updateUser = createAsyncThunk("updateUser", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  console.log(token);
  const response = await fetch(BASE_URL + `/api/user/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});
export const deleteUser = createAsyncThunk("deleteUser", async (userId) => {
  let token = localStorageWithExpiry.getItem("token");
  console.log(token);
  const response = await fetch(BASE_URL + `/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer" + token,
    },
  });
  return await response.json();
});

export const loginUser = createAsyncThunk("loginUser", async (data) => {
  const response = await fetch(BASE_URL + "/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
});

export const uploadUserImage = createAsyncThunk(
  "uploadUserImage",
  async (data) => {
    let formData = new FormData();
    let image = data.image;
    formData.append("image", image);
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(
      BASE_URL + `/api/user/image/upload/${data.userId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
        },
        body: formData,
      }
    );
    const res = await response.json();
    return res;
  }
);
export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  async (userId) => {
    const response = await fetch(BASE_URL + `/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
export const fetchUserByEmail = createAsyncThunk(
  "fetchUserByEmail",
  async (email) => {
    const response = await fetch(BASE_URL + `/api/user/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
export const fetchAllUser = createAsyncThunk("fetchAllUser", async () => {
  const response = await fetch(BASE_URL + "/api/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});

const userSlice = createSlice({
  name: "userDetail",
  initialState: {
    loading: false,
    error: null,
    isLogin: false,
    users: [],
    userData: null,
    allUsers: null,
    admin_user: null,
    isEdit: false,
    isDelete: false,
    block_status: null,
    toggle_search:true,
  },
  reducers: {
    setBlockStatus: (state, action) => {
      state.block_status = action.payload;
    },
    setToggleSearch: (state, action) => {
      state.toggle_search = action.payload;
    },
    doLogin: (state) => {
      state.isLogin = true;
    },
    doLogout: (state) => {
      localStorage.removeItem("data");
      localStorage.removeItem("token");
      state.isLogin = false;
    },
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setALlUser: (state, action) => {
      state.allUsers = action.payload;
    },
    setAdminUser: (state, action) => {
      state.admin_user = action.payload;
    },
    setEditDone: (state) => {
      state.isEdit = true;
    },
    setEditEnd: (state) => {
      state.isEdit = false;
    },
    setDeleteDone: (state) => {
      state.isDelete = true;
    },
    setDeleteEnd: (state) => {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      }),
      builder.addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = action.payload;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(updateUser.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(uploadUserImage.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(uploadUserImage.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(uploadUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(fetchUserById.pending, (state) => {
        // state.loading = true;
      }),
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        // state.loading = false;
      }),
      builder.addCase(fetchUserById.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(fetchAllUser.pending, (state) => {
      // state.loading = true;
    }),
      builder.addCase(fetchAllUser.fulfilled, (state, action) => {
        // state.loading = false;
      }),
      builder.addCase(fetchAllUser.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(fetchUserByEmail.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const loginAction = userSlice.actions;
export default userSlice.reducer;
