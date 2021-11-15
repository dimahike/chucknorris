import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from '../components/Categories/CategoriesSlice';
import randomJockReducer from '../components/RandomJock/RandomJockSlice';
import searchReducer from '../components/Search/SearchSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    randomJock: randomJockReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store
