import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import formatDate from "../../utils.js/date";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(POST_URL);
  const data = res.data.slice(0, 20);
  return data;
});

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
      // return res.data 这里删除之后请求返回的是空对象，所以后面addcase的aciton.payload拿不到id
      // 这里就人为返回一下数据
      if (res?.status === 200) return postData;
      return `${res?.status}: ${res?.statusText}`;
    } catch (e) {
      console.log("Fail to delete post: ", e);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: formatDate(new Date()),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const isExistPost = state.posts.find((post) => post.id === postId);
        if (isExistPost) {
          isExistPost.reactions[reaction]++;
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        const loadedPosts = action.payload.map((post) => {
          post.date = formatDate(new Date());
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        action.payload.id = state.posts[state.posts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = formatDate(new Date());
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update post failed");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = formatDate(new Date());
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete post failed");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === Number(postId));

export const { addPost, addReaction } = postSlice.actions;

export default postSlice.reducer;
