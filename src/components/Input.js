import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Styles from '../helper/Styles';
import {height} from '../helper/Index';

const Input = ({
  placeholder,
  onChangeText,
  style,
  onFocus,
  rounded,
  value,
  numeric,
  multiline,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      style={[
        styles.input,
        {...style},
        {
          borderRadius: rounded ? 50 : 10,
          paddingHorizontal: rounded ? height(2) : 10,
        },
      ]}
      keyboardType={numeric ? 'numeric' : 'default'}
      onChangeText={onChangeText}
      onFocus={onFocus}
      multiline={multiline}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#333',
    marginVertical: height(0.6),
    width: '100%',
    height: 46,
  },
});
