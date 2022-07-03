import {
  heightPercentageToDP as height,
  widthPercentageToDP as width,
} from 'react-native-responsive-screen';
import {RFPercentage as font} from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';

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

export {height, width, font, Colours, snackHandler};
