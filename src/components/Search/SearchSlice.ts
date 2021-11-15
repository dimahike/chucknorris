import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { getSearchingJocks } from '../../api/api';

import { ErrorInterface, JockInterface, Loading } from '../../types/types';


export const fetchSearchingJocks = createAsyncThunk(
  'search/fetchSearchingJocks',
  async (query: string, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const response = await getSearchingJocks(query);

      return response.data;
    } catch (err: any) {
      let error: AxiosError<ErrorInterface> = err

      if (!error.response) {
        throw err
      }

      return rejectWithValue(error.response.data);
    }
  },
);


interface InitialStateInterface {
  jocks: Array<JockInterface>,
  loading: Loading,
  requestId?: string
  error: ErrorInterface,
}

export const initialState: InitialStateInterface = {
  jocks: [],
  loading: "idle",
  requestId: undefined,
  error: {
    timestamp: "",
    status: 200,
    error: "",
    message: "",
    violations: {
      "search.query": ""
    }
  },
}

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchingJocks.pending, (state, action) => {
      state.loading = "pending";
      state.requestId = action.meta.requestId;
    })
    builder.addCase(fetchSearchingJocks.fulfilled, (state, action) => {
      const { payload, meta } = action;
      const { requestId } = meta;

      if (state.loading === 'pending' && state.requestId === requestId) {
        state.jocks = payload.result;
        state.error.status = 200;
        state.loading = "idle";
        state.requestId = undefined;
      }
    })
    builder.addCase(fetchSearchingJocks.rejected, (state, action: any) => {
      const { meta, payload } = action;
      const { requestId } = meta;

      if (state.loading === 'pending' && state.requestId === requestId) {
        state.jocks = [];
        state.error = payload;
        state.loading = "idle";
        state.requestId = undefined;
      }
    })

  }
})

export default SearchSlice.reducer;