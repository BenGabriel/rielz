import {Text} from 'react-native';
import React from 'react';
import {font} from '../helper/Index';

const Typography = ({text, size, color, bold, style}) => {
  return (
    <Text
      style={{
          color: color ? color : '#000',
        fontSize: size ? font(size) : font(1.8),
        fontFamily: bold ? 'DMSans-Bold' : 'DMSans-Regular',
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default Typography;

