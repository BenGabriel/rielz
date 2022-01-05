import {
  heightPercentageToDP as height,
  widthPercentageToDP as width,
} from 'react-native-responsive-screen';
import {RFPercentage as font} from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';

export {height, width, font};

export const Colors = {
  primary: '#004aad',
  white: '#fff',
  black: '#333',
  grey: '#A0A7BA',
  secondary: '#38b5ff',
};

export const snackHandler = text => {
  return Snackbar.show({
    backgroundColor: Color.primary,
    text,
    duration: Snackbar.LENGTH_SHORT,
  });
};
