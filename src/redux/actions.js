import {createAsyncThunk} from '@reduxjs/toolkit';
import {getSession} from '../helper/Index';
import axios from 'axios';
import api from '../helper/endpoint.json';

export const fetchAllUser = createAsyncThunk('fetchUsers', async () => {
  const token = await getSession();
  const res = await axios.get(`${api.url}${api.get.user}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 200) {
    return res.data;
  } else {
    console.log(res.data, 'error');
  }
});

export const fetchAllHouses = createAsyncThunk('fetchHouses', async () => {
  const token = await getSession();
  const res = await axios.get(`${api.url}${api.get.houses}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 200) {
    return res.data;
  } else {
    console.log(res.data, 'error');
  }
});

export const fetchLandlordHouses = createAsyncThunk(
  'fetchLandlordHouses',
  async () => {
    const token = await getSession();
    const res = await axios.get(`${api.url}${api.get.houses}/landlord`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      console.log(res.data, 'error');
    }
  },
);
