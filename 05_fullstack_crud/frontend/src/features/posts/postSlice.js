import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  postItem: {},
  postItemStatus: "idle",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const POST_URL = "http://localhost:8000/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POST_URL);
    return res.data;
  } catch (e) {
    console.log("Fail to fetch posts: ", e);
  }
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    try {
      const res = await axios.get(`${POST_URL}/${postId}`);
      return res.data;
    } catch (e) {
      console.log("Fail to fetch postItem: ", e);
    }
  }
);
export const createNewPost = createAsyncThunk(
  "posts/addPost",
  async (initPost) => {
    try {
      const res = await axios.post(POST_URL, initPost);
      return res.data;
    } catch (e) {
      console.log("Fail to post new post: ", e);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    const { id } = postData;
    try {
      const res = await axios.put(`${POST_URL}/${id}`, postData);
      return res.data;
    } catch (e) {
      console.log("Fail to update post: ", e);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postData) => {
    const { id } = postData;
    try {
      const res = await axios.delete(`${POST_URL}/${id}`);
      if (res?.status === 200) return res.data;
    } catch (e) {
      console.log("Fail to delete post: ", e);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.postItemStatus = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postItemStatus = "succeeded";
        state.postItem = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById = (state) => state.posts.postItem;
export const getPostItemStatus = (state) => state.posts.postItemStatus;

export default postSlice.reducer;
