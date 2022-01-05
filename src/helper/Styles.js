import {StyleSheet} from 'react-native';
import {font, height, width} from '../helper/Index';

const Styles = StyleSheet.create({
  text: (color, size, value) => ({
    color,
    fontSize: font(size),
    fontFamily: value ? 'DMSans-Bold' : 'DMSans-Regular',
  }),
});

export default Styles;
