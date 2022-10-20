import {
  heightPercentageToDP as height,
  widthPercentageToDP as width,
} from 'react-native-responsive-screen';
import {RFPercentage as font} from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Colors = {
  primary: '#004aad',
  white: '#fff',
  black: '#333',
  grey: '#A0A7BA',
  secondary: '#38b5ff',
  brown: '#59534d',
};

const snackHandler = (text, type) => {
  return Snackbar.show({
    backgroundColor: type === 'error' ? '#f00' : Colors.primary,
    text,
    duration: Snackbar.LENGTH_SHORT,
  });
};

const emailRegex = RegExp(
  /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
);

const setSession = async data => {
  try {
    await AsyncStorage.setItem('SESSION', data);
  } catch (err) {
    console.log('something happened', err);
  }
};

const getSession = async () => {
  try {
    const data = await AsyncStorage.getItem('SESSION');
    return data;
  } catch (err) {
    console.log('something happened', err);
  }
};
const setUser = async data => {
  try {
    await AsyncStorage.setItem('USERID', data);
  } catch (err) {
    console.log('something happened', err);
  }
};
const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem('USERID');
    return JSON.parse(data);
  } catch (err) {
    console.log('something happened', err);
  }
};

const phoneRegex = RegExp(/^\s*-?[0-9]{1,11}\s*$/);

const formatAmount = value => {
  const newAmt = parseInt(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return newAmt;
};

const formatInput = n => {
  let b = n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return b.toString();
};

const convertTocurrency = value => {
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(1) + 'B'
    : Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + 'M'
    : Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(1) + 'K'
    : Math.abs(Number(value));
};

export {
  height,
  width,
  font,
  Colors,
  snackHandler,
  emailRegex,
  phoneRegex,
  setSession,
  getSession,
  setUser,
  getUser,
  formatAmount,
  formatInput,
  convertTocurrency
};
