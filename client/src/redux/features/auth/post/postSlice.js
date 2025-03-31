import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

// Створення нового поста
export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    console.log('Creating post with params:', params);  // Логування параметрів

    // Перевірка обов'язкових полів
    if (!params.title || !params.content) {
      throw new Error('Title and content are required');
    }

    const { data } = await axios.post('/posts', params);
    return data;
  } catch (error) {
    throw error;  // Пробросити помилку
  }
});

// Отримання всіх постів
export const getAllposts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log('Error fetching posts:', error.response ? error.response.data : error.message);
    return { posts: [], popularPosts: [] };  // Запобігаємо помилці, повертаємо пусті масиви
  }
});

// Видалення поста
export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log('Error removing post:', error.response ? error.response.data : error.message);
    throw error;  // Пробросити помилку
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Створення поста
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        console.log('Post creation failed:', action.error.message);  // Лог помилки
      })

      // Отримання всіх постів
      .addCase(getAllposts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllposts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts || [];
        state.popularPosts = action.payload?.popularPosts || [];
      })
      .addCase(getAllposts.rejected, (state, action) => {
        state.loading = false;
        console.log('Fetching posts failed:', action.error.message);  // Лог помилки
      })

      // Видалення поста
      .addCase(removePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload.id);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.loading = false;
        console.log('Removing post failed:', action.error.message);  // Лог помилки
      });
  },
});

export default postSlice.reducer;
