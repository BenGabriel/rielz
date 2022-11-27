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
  height,
  width,
  snackHandler,
  emailRegex,
  setSession,
  setUser,
} from '../../helper/Index';
import Styles from '../../helper/Styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Typography from '../../components/Typography';
import axios from 'axios';
import api from '../../helper/endpoint.json';
import {useDispatch} from 'react-redux';
import {
  fetchAllHouses,
} from '../../redux/actions';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({});
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const onChange = ({name, value}) => {
    setErrors({email: '', password: ''});
    setLoginDetails({...loginDetails, [name]: value});
  };

  const handleLogin = async () => {
    if (!emailRegex.test(loginDetails.email))
      return setErrors({...errors, email: 'Enter a valid email'});
    if (loginDetails.password === undefined || loginDetails.password.length < 7)
      return setErrors({
        ...errors,
        password: 'Password must be greater than 7',
      });

    setLoading(true);
    try {
      const {data} = await axios.post(
        `${api.url}${api.authenticate.login}`,
        {
          email: loginDetails.email.trimEnd(),
          password: loginDetails.password.trimEnd(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setSession(data.token);
      setUser(JSON.stringify(data.user))
      setLoading(false);
      dispatch(fetchAllHouses());
      navigation.replace('Stack');
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Login failed', 'error');
      }
    }
  };

  return (
    <ScrollView
      style={{flex: 1, width: width(100)}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/authbackground.png')}
        style={{
          width: width(100),
          height: height(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/logo1.png')}
          style={{width: 200, height: 200, marginBottom: height(-3)}}
        />
        <Typography text="Welcome" size={3} />
        <Typography
          text="Sign In"
          size={2}
          style={{marginVertical: height(1)}}
        />

        <View
          style={{width: '80%', marginTop: height(3), alignItems: 'center'}}>
          <Input
            placeholder="Email"
            onChangeText={value => onChange({name: 'email', value})}
            rounded
            error={errors.email}
          />
          <Input
            placeholder="Password"
            onChangeText={value => onChange({name: 'password', value})}
            rounded
            error={errors.password}
            secure
          />
        </View>
        <Button
          style={{marginTop: height(5)}}
          onPress={handleLogin}
          load={loading}
          disabled={loading}>
          Login
        </Button>
        <Text
          style={{
            ...Styles.text(Colors.grey, 1.7, false),
            marginTop: height(1),
          }}>
          Don’t have an account?{' '}
          <Text style={{color: Colors.primary}} onPress={navigateToRegister}>
            Sign up
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;

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
