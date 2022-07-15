import {createSlice} from '@reduxjs/toolkit';
import {fetchAllHouses, fetchAllUser, fetchLandlordHouses} from './actions';

const initialState = {
  users: [],
  houses: [],
  landlordHouses:[],
  loading: false,
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
      .addCase(fetchAllHouses.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllHouses.fulfilled, (state, action) => {
        (state.loading = false), (state.houses = action.payload);
      })
      .addCase(fetchLandlordHouses.pending, state => {
        state.loading = true;
      })
      .addCase(fetchLandlordHouses.fulfilled, (state, action) => {
        (state.loading = false), (state.landlordHouses = action.payload);
      })
  },
});

export default appSlice.reducer;
