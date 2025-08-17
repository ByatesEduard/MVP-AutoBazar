import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/fixed_axios';

const initialState = {
  posts: [],
  popularPosts: [],
  page: 1,
  pages: 1,
  hasMore: true,
  loading: false,
  filterTimeout: null,
};

// Створення нового поста
export const createPost = createAsyncThunk(
  'post/createPost',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/posts', params);

      dispatch(getAllposts()); // Оновлюємо список постів після створення

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Отримання всіх постів (з фільтрацією)
export const getAllposts = createAsyncThunk(
  'post/getAllPosts',
  async ({ filters = {}, page = 1, limit = 12 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/posts', {
        params: { ...filters, page, limit }
      });
      return { ...data, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// Отримання даних користувача
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    try {
      const { data } = await axios.get(`/users/${userId}`); // Запит до API для отримання даних користувача
      return data;
    } catch (error) {
      console.log('Error fetching user:', error.response ? error.response.data : error.message);
      return null;
    }
  }
);

// Видалення поста
export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log('Error removing post:', error.response ? error.response.data : error.message);
    throw error; // Пробросити помилку
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFilterTimeout: (state, action) => {
      state.filterTimeout = action.payload;
    },
  },
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
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
      })

      // Отримання всіх постів
      .addCase(getAllposts.pending, (state) => {
        state.loading = true;
        console.log('Redux: getAllposts pending');
      })
      .addCase(getAllposts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, popularPosts, pagination, page } = action.payload;

        if (page === 1) {
          state.posts = posts; // перша сторінка — заміняємо
        } else {
          state.posts = [...state.posts, ...posts]; // інші сторінки — додаємо
        }

        state.popularPosts = popularPosts;
        state.page = page;
        state.pages = pagination.pages;
        state.hasMore = pagination.hasMore;
      })

      // Видалення поста
      .addCase(removePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload.id);
      })
      .addCase(removePost.rejected, (state) => {
        state.loading = false;
      })

      // Завантаження даних користувача
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Додаємо користувача в state
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilterTimeout } = postSlice.actions;
export default postSlice.reducer;
