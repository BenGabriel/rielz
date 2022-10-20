import {createSlice} from '@reduxjs/toolkit';
import {fetchAllUser, fetchUser} from '../actions';

const initialState = {
  users: [],
  loading: false,
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        (state.loading = false), (state.users = action.payload);
      })
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
      });
  },
});

export default appSlice.reducer;
