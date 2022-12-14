import {createSlice} from '@reduxjs/toolkit';
import {fetchUser} from '../actions';

const initialState = {
  users: null,
  loading: false,
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
      state.users = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, state => {
        state.loading = false;
      });
  },
});

export const {saveUser, logout} = appSlice.actions;

export default appSlice.reducer;
