import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/slice';
import houseSlice from './slice/houseSlice';

export const store = configureStore({
  reducer: {
    appSlice,
    houseSlice
  },
});
