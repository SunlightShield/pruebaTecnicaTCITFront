import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post(BASE_URL, postData);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    filteredPosts: [],
    status: 'idle',
  },
  reducers: {
    filterPostsByName: (state, action) => {
      const search = action.payload.toLowerCase();
      state.filteredPosts = state.allPosts.filter(post =>
        post.name.toLowerCase().includes(search)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.filteredPosts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.allPosts.push(action.payload);
        state.filteredPosts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.allPosts = state.allPosts.filter(p => p.id !== id);
        state.filteredPosts = state.filteredPosts.filter(p => p.id !== id);
      });
  },
});

export const { filterPostsByName } = postsSlice.actions;
export default postsSlice.reducer;
