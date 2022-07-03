import {StyleSheet} from 'react-native';
import {font, height, width} from '../helper/Index';

const Styles = StyleSheet.create({
  text: (color, size, value) => ({
    color,
    fontSize: font(size),
    fontFamily: value ? 'DMSans-Bold' : 'DMSans-Regular',
  }),
  pickerContainer: {
    width: '100%',
    padding: height(2),
    paddingVertical: height(1),
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowSpaceCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
