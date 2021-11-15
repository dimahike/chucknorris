import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { getCategories, getRandomJock } from '../../api/api';

import { ErrorInterface, JockInterface, Loading } from '../../types/types';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_: void, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const response = await getCategories();

      return response.data;
    } catch (err: any) {
      let error: AxiosError<ErrorInterface> = err

      if (!error.response) {
        throw err
      }

      return rejectWithValue(error.response.status);
    }
  },
);

export const fetchJocksByCategory = createAsyncThunk(
  'categories/fetchJocksByCategory',
  async (category: string, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const response = await getRandomJock(category);

      return response.data;
    } catch (err: any) {
      let error: AxiosError<ErrorInterface> = err

      if (!error.response) {
        throw err
      }

      return rejectWithValue(error.response.status);
    }
  },
);

interface InitialStateInterface {
  categories: Array<string>,
  categoriesLoading: Loading,
  categoriesRequestId?: string,
  jock: JockInterface,
  jockLoading: Loading,
  jockRequestId?: string
}

export const initialState: InitialStateInterface = {
  categories: [],
  categoriesLoading: "idle",
  categoriesRequestId: undefined,
  jock: {
    categories: [],
    created_at: "",
    icon_url: "",
    id: "",
    updated_at: "",
    url: "",
    value: "",
  },
  jockLoading: "idle",
  jockRequestId: undefined
};

export const SortSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.categoriesLoading = "pending";
      state.categoriesRequestId = action.meta.requestId;
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const { payload, meta } = action;
      const { requestId } = meta;

      if (state.categoriesLoading === 'pending' && state.categoriesRequestId === requestId) {
        state.categories = payload;
        state.categoriesLoading = "idle";
        state.categoriesRequestId = undefined;
      }
    })
    builder.addCase(fetchCategories.rejected, (state, action: any) => {
      const { meta } = action;
      const { requestId } = meta;

      if (state.categoriesLoading === 'pending' && state.categoriesRequestId === requestId) {
        state.categoriesLoading = "idle";
        state.categoriesRequestId = undefined;
      }
    })
    builder.addCase(fetchJocksByCategory.pending, (state, action) => {
      state.jockLoading = "pending";
      state.jockRequestId = action.meta.requestId;
    })
    builder.addCase(fetchJocksByCategory.fulfilled, (state, action) => {
      const { payload, meta } = action;
      const { requestId } = meta;

      if (state.jockLoading === 'pending' && state.jockRequestId === requestId) {
        state.jock = payload
        state.jockLoading = "idle"
        state.jockRequestId = undefined
      }
    })
    builder.addCase(fetchJocksByCategory.rejected, (state, action) => {
      const { meta } = action;
      const { requestId } = meta;

      if (state.jockLoading === 'pending' && state.jockRequestId === requestId) {
        state.jockLoading = "idle";
        state.jockRequestId = undefined;
      }
    })
  }
})

export default SortSlice.reducer;