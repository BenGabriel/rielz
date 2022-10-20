import {createSlice} from '@reduxjs/toolkit';
import {
  fetchAllHouses,
  fetchLandlordHouses,
} from '../actions';

const initialState = {
  houses: [],
  landlordHouses: [],
  loading: false,
};

export const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

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
      });
  },
});

export default houseSlice.reducer;
