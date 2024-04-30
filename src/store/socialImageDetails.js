import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, localStorageWithExpiry } from "./helper";
export const createSocialPost = createAsyncThunk("createSocialPost",async (data) => {
    let token = localStorageWithExpiry.getItem("token");
    const response = await fetch(BASE_URL + `/api/socialImage/${data.ngoId}`,
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
    BASE_URL + `/api/socialImage/${data.socialId}`,
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
      BASE_URL + `/api/socialImage/${socialId}`,
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
      BASE_URL + `/api/socialImage/image/${data.socialId}`,
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
    const response = await fetch(BASE_URL + `/api/socialImage/ngo/${ngoId}`,
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
      BASE_URL + `/api/socialImage/${socialId}`,
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
export const getTotalSocialPost = createAsyncThunk(
  "getTotalSocialPost",
  async () => {
    const response = await fetch(
      BASE_URL + `/api/socialImage/length`,
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
export const getTotalSocialPostByNgo = createAsyncThunk(
  "getTotalSocialPostByNgo",
  async (ngoId) => {
    const response = await fetch(
      BASE_URL + `/api/socialImage/ngo/length/${ngoId}`,
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
    isImageUpload: false,
    total_socialPost:'0',
    total_socialPost_of_ngo:'0'
  },
  reducers: {
    setTotalSocialPost:(state,action)=>{
      state.total_socialPost=action.payload;
    },
    setTotalSocialPostByNgo:(state,action)=>{
      state.total_socialPost_of_ngo = action.payload;
    },
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
    imagePending: (state) => {
      state.isImageUpload = true;
    },
    imageDone: (state) => {
      state.isImageUpload = false;
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
    builder.addCase(getTotalSocialPost.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(getTotalSocialPost.fulfilled, (state, action) => {
      // state.loading = false;
    });
    builder.addCase(getTotalSocialPost.rejected, (state, action) => {
      // state.loading = false;
    });
    builder.addCase(getTotalSocialPostByNgo.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(getTotalSocialPostByNgo.fulfilled, (state, action) => {
      // state.loading = false;
    });
    builder.addCase(getTotalSocialPostByNgo.rejected, (state, action) => {
      // state.loading = false;
    });
  },
});
export const socialPostAction=socialImageDetails.actions;
export default socialImageDetails.reducer;
