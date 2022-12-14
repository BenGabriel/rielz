import {createAsyncThunk} from '@reduxjs/toolkit';
import {getSession, getUser} from '../helper/Index';
import axios from 'axios';
import api from '../helper/endpoint.json';

//get singleUser
export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const user = await getUser();
  const token = await getSession();
  const res = await axios.get(`${api.url}${api.get.user}/${user.ID}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 200) {
    return res.data;
  } else {
    console.log(res, 'error');
  }
});

export const fetchAllHouses = createAsyncThunk('fetchHouses', async () => {
  const res = await axios.get(`${api.url}${api.get.houses}`);
  if (res.status === 200) {
    return res.data;
  } else {
    console.log(res.data, 'error');
  }
});

export const fetchLandlordHouses = createAsyncThunk(
  'fetchLandlordHouses',
  async () => {
    const user = await getUser();
    const token = await getSession();
    const res = await axios.get(`${api.url}${api.get.getLandlord}/${user.ID}`, {
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
