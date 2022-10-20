import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
  emailRegex,
  height,
  phoneRegex,
  snackHandler,
  width,
} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../common/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Typography from '../../components/Typography';
import axios from 'axios';
import api from '../../helper/endpoint.json';

const Register = ({navigation}) => {
  const [registerDetails, setRegisterDetails] = useState({});
  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigateToLogin = () => {
    navigation.goBack();
  };

  const onChange = ({name, text}) => {
    setError({
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: '',
      password: '',
    });
    setRegisterDetails({...registerDetails, [name]: text});
  };

  const handleRegister = () => {
    if (registerDetails.firstname === undefined)
      return setError({...error, firstname: 'Enter your First Name'});
    if (registerDetails.lastname === undefined)
      return setError({...error, lastname: 'Enter your Last Name'});
    if (!emailRegex.test(registerDetails.email))
      return setError({...error, email: 'Enter a valid Email'});
    if (
      !phoneRegex.test(registerDetails.phonenumber) ||
      registerDetails.phonenumber.length < 11
    )
      return setError({...error, phonenumber: 'Enter a valid Phone Number'});
    if (
      registerDetails.password === undefined ||
      registerDetails.password.length < 7
    )
      return setError({
        ...error,
        password: 'Password must be greater than 7',
      });

    registerUser();
  };

  const registerUser = async () => {
    setLoading(true);
    console.log(api.url, api.authenticate.signup);
    try {
      await axios.post(
        `${api.url}${api.authenticate.signup}`,
        {
          email: registerDetails.email.trimEnd(),
          lastname: registerDetails.lastname.trimEnd(),
          firstname: registerDetails.firstname.trimEnd(),
          phonenumber: registerDetails.phonenumber.trimEnd(),
          password: registerDetails.password.trimEnd(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
      navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Registration failed', 'error');
      }
    }
  };

  return (
    <ScrollView
      style={{flex: 1, width: width(100)}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/authbackground.png')}
        style={{width: width(100), height: height(100), alignItems: 'center'}}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={navigateToLogin}
        />

        <Image
          source={require('../../assets/images/logo1.png')}
          style={{
            width: 200,
            height: 200,
            marginVertical: height(-3),
            marginTop: height(-8),
          }}
        />
        <Typography text="Register" size={3} />
        <Typography
          text="Kindly complete the information"
          size={2}
          style={{marginVertical: height(1)}}
        />
        <View
          style={{width: '80%', marginTop: height(3), alignItems: 'center'}}>
          <Input
            placeholder="First Name"
            onChangeText={text => onChange({name: 'firstname', text})}
            rounded
            error={error.firstname}
          />
          <Input
            placeholder="Last Name"
            onChangeText={text => onChange({name: 'lastname', text})}
            rounded
            error={error.lastname}
          />
          <Input
            placeholder="Email"
            onChangeText={text => onChange({name: 'email', text})}
            rounded
            error={error.email}
          />
          <Input
            placeholder="Phone Number"
            onChangeText={text => onChange({name: 'phonenumber', text})}
            rounded
            error={error.phonenumber}
          />
          <Input
            placeholder="Password"
            onChangeText={text => onChange({name: 'password', text})}
            rounded
            error={error.password}
            secure
          />
        </View>
        <Button
          style={{marginTop: height(5)}}
          onPress={handleRegister}
          load={loading}>
          Sign Up
        </Button>
        <Text
          style={{
            ...Styles.text(Colors.grey, 1.7, false),
            marginTop: height(1),
          }}>
          Have an account?{' '}
          <Text style={{color: Colors.primary}} onPress={navigateToLogin}>
            Login
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#ECF0F4',
    alignSelf: 'flex-start',
    margin: height(3),
  },
  input: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#aaa',
    marginVertical: height(0.6),
    width: '80%',
    borderRadius: 50,
    paddingLeft: height(2),
    height: 46,
  },
});
