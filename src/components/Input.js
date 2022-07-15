import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Styles from '../helper/Styles';
import {height} from '../helper/Index';
import {Ionicons} from '../common/Icons';

const Input = ({
  placeholder,
  onChangeText,
  style,
  onFocus,
  rounded,
  value,
  numeric,
  multiline,
  error,
  secure,
}) => {
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={{width: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...styles.input,

          borderRadius: rounded ? 50 : 10,
          paddingHorizontal: rounded ? height(2) : 10,
          borderColor: error ? 'red' : 'black',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={placeholder}
          value={value}
          style={{width: secure ? '70%' : '100%', ...style}}
          keyboardType={numeric ? 'numeric' : 'default'}
          onChangeText={onChangeText}
          onFocus={onFocus}
          multiline={multiline}
          secureTextEntry={secure ? secureText : false}
        />
        {secure && (
          <Ionicons
            name={secureText ? 'eye-off-sharp' : 'eye'}
            size={20}
            onPress={() => setSecureText(!secureText)}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            ...Styles.text('red', 1.3, false),
            marginLeft: 10,
            marginBottom: 5,
          }}>
          {error}
        </Text>
      )}
    </View>
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
