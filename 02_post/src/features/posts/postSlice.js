import { createSlice, nanoid } from "@reduxjs/toolkit";
import formatDate from "../../utils.js/date";

const initialState = [
  {
    id: "1",
    title: "Post 1",
    content: "content 1, this is the first content for the first post",
    date: formatDate(new Date()),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Post 2",
    content: "content 2, this is the secend content for the secend post",
    date: formatDate(new Date()),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.unshift(action.payload);
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
        const isExistPost = state.find((post) => post.id === postId);
        if (isExistPost) {
          isExistPost.reactions[reaction]++;
        }
      },
    },
  },
});

export const allPosts = (state) => state.posts;

export const { addPost, addReaction } = postSlice.actions;

export default postSlice.reducer;
