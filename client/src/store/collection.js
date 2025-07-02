import { main_server } from '@/helpers/http-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collection: [],
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
    setCollection(state, action) {
      state.collection = action.payload;
    }
  }
});

export const { setLoading, setError, setCollection } = collectionSlice.actions;
export const collectionReducer = collectionSlice.reducer;

export const fetchCollection = createAsyncThunk(
  'collection/fetchCollection',
  async function fetchCollection(payload, thunkAPI) {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const { data } = await main_server.get('/my-scenes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      dispatch(setCollection(data.collections));
    } catch (error) {
      console.log(error);
      dispatch(setError(error?.response?.data?.message || 'Something went wrong'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
