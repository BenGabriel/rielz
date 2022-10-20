import {StyleSheet} from 'react-native';
import {font, height} from '../helper/Index';

const Styles = StyleSheet.create({
  text: (color, size, value) => ({
    color,
    fontSize: font(size),
    fontWeight: value ? 'bold' : '400',
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
  },
  flexRowCenterAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowSpaceCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Styles;
