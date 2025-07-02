import { main_server } from '@/helpers/http-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {
      name: ''
    },
    loading: false,
    error: ''
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  }
});

export const { setLoading, setError, setUser } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async function fetchProfile(payload, thunkAPI) {
  const { dispatch } = thunkAPI;

  try {
    dispatch(setLoading(true));
    const { data } = await main_server.get('/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    dispatch(setUser(data.user));
  } catch (error) {
    console.log(error);
    dispatch(setError(error?.response?.data?.message || 'Something went wrong'));
  } finally {
    dispatch(setLoading(false));
  }
});
