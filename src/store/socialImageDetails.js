import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageWithExpiry } from "./helper";
export const createSocialPost = createAsyncThunk("createSocialPost",async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(`http://localhost:8080/api/socialImage/${data.ngoId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
        body: JSON.stringify(data.caption),
      }
    );
    return await response.json();
  });
export const updateSocialPost = createAsyncThunk("updateSocialPost", async (data) => {
  let token = localStorageWithExpiry.getItem("token");
  const response = await fetch(
    `http://localhost:8080/api/socialImage/${data.socialId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify(data.caption),
    }
  );
  return await response.json();
});
export const deleteSocialPost = createAsyncThunk(
  "deleteSocialPost",
  async (socialId) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(
      `http://localhost:8080/api/socialImage/${socialId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    return await response.json();
  }
);
export const uploadSocialPostImage = createAsyncThunk("uploadSocialPostImage",async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    let formData=new FormData();
    formData.append("image",data.image);
    const response = await fetch(
      `http://localhost:8080/api/socialImage/image/${data.socialId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
        },
        body: formData,
      }
    );
    return await response.json();
  }
);
export const getSocialPostByNgo = createAsyncThunk("getSocialPostByNgo",async (ngoId) => {
    const response = await fetch(`http://localhost:8080/api/socialImage/ngo/${ngoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
);
export const getSocialPostById = createAsyncThunk(
  "getSocialPostById",
  async (socialId) => {
    const response = await fetch(
      `http://localhost:8080/api/socialImage/${socialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
);
const socialImageDetails = createSlice({
  name: "socialImageDetails",
  initialState: {
    loading: false,
    socialPosts: null,
    isDelete: false,
    isCreate: false,
    isUpdate: false,
  },
  reducers: {
    setSocialPost: (state, action) => {
      state.socialPosts = action.payload;
    },
    deletePending: (state) => {
      state.isDelete = true;
    },
    deleteDone: (state) => {
      state.isDelete = false;
    },
    createPending: (state) => {
      state.isCreate = true;
    },
    createDone: (state) => {
      state.isCreate = false;
    },
    updatePending: (state) => {
      state.isUpdate = true;
    },
    updateDone: (state) => {
      state.isUpdate = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSocialPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createSocialPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createSocialPost.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadSocialPostImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadSocialPostImage.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadSocialPostImage.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSocialPostByNgo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSocialPostByNgo.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSocialPostByNgo.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteSocialPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSocialPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteSocialPost.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSocialPostById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSocialPostById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSocialPostById.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateSocialPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSocialPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateSocialPost.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const socialPostAction=socialImageDetails.actions;
export default socialImageDetails.reducer;
