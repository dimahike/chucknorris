import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { getRandomJock } from '../../api/api';

import { ErrorInterface, JockInterface, Loading } from '../../types/types';

export const fetchRandomJock = createAsyncThunk(
  'randomJock/fetchRandomJock',
  async (_: void, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const response = await getRandomJock();
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
  error: ErrorInterface,
  jock: JockInterface,
  loading: Loading,
  requestId?: string
}

export const initialState: InitialStateInterface = {
  error: {
    timestamp: "",
    status: 200,
    error: "",
    message: "",
    violations: {
      "search.query": ""
    }
  },
  jock: {
    categories: [],
    created_at: "",
    icon_url: "",
    id: "",
    updated_at: "",
    url: "",
    value: "",
  },
  loading: "idle",
  requestId: undefined
}

export const RandomJockSlice = createSlice({
  name: 'randomJock',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchRandomJock.pending, (state, action) => {
      state.loading = "pending";
      state.requestId = action.meta.requestId;
    })
    builder.addCase(fetchRandomJock.fulfilled, (state, action) => {
      const { payload, meta } = action;
      const { requestId } = meta;

      if (state.loading === 'pending' && state.requestId === requestId) {
        state.error.status = 200;
        state.jock = payload;
        state.loading = "idle";
        state.requestId = undefined;
      }
    })
    builder.addCase(fetchRandomJock.rejected, (state, action: any) => {
      const { meta, payload } = action;
      const { requestId } = meta;

      if (state.loading === 'pending' && state.requestId === requestId) {
        state.loading = "idle";
        state.error = payload;
        state.requestId = undefined;
      }
    })
  }
})

export default RandomJockSlice.reducer;