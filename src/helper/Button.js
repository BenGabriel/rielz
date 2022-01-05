import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import { Colors, width } from './Index';
import Styles from './Styles';

const Button = props => {
  return (
    <TouchableOpacity {...props} style={{...styles.button, ...props.style}}>
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
    backgroundColor: Colors.primary,
    width: width(80),
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
