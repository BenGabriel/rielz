import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../helper/Icons';
import Button from '../../helper/Button';

const Login = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const {email, password} = loginDetails;

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
          onPress={() => navigation.goBack()}
        />

        <Image
          source={require('../../assets/images/logo1.png')}
          style={{width: 200, height: 200, marginBottom: height(-3)}}
        />
        <Text style={Styles.text('#333', 3, false)}>Welcome</Text>
        <Text
          style={{...Styles.text('#333', 2, false), marginVertical: height(1)}}>
          Sign in as a Landlord
        </Text>
        <View
          style={{width: '100%', marginTop: height(3), alignItems: 'center'}}>
          <TextInput
            value={email}
            placeholder="Email"
            style={styles.input}
            onChangeText={text =>
              setLoginDetails({...loginDetails, email: text})
            }
          />
          <TextInput
            value={password}
            placeholder="Password"
            style={styles.input}
            onChangeText={text =>
              setLoginDetails({...loginDetails, password: text})
            }
          />
        </View>
        <Button
          style={{marginTop: height(5)}}
          onPress={() => navigation.replace('LandLord')}>
          Login
        </Button>
        <Text
          style={{
            ...Styles.text(Colors.grey, 1.7, false),
            marginTop: height(1),
          }}>
          Don’t have an account?{' '}
          <Text
            style={{color: Colors.primary}}
            onPress={() => navigation.navigate('Register')}>
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
