import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {Colors, width} from '../helper/Index';
import Styles from '../helper/Styles';

const Button = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...styles.button,
        opacity: props.disabled ? 0.7 : 1,
        ...props.style,
      }}
      activeOpacity={0.5}
      disabled={props.disabled}>
      {props.load ? (
        <BarIndicator color="white" size={20} count={6} />
      ) : (
        <Text style={styles.text}>{props.children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: width(80),
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    ...Styles.text('#fff', 1.6, true),
    textAlign: 'center',
  },
});
