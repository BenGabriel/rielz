import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../common/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Typography from '../../components/Typography';

const Register = ({navigation}) => {
  const [registerDetails, setRegisterDetails] = useState({});

  const navigateToLogin = () => {
    navigation.goBack();
  };

  const onChange = ({name, text}) => {
    setRegisterDetails({...registerDetails, [name]: text});
  };

  const handleRegister = () => {
    console.log(registerDetails);
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
          style={{width: '100%', marginTop: height(3), alignItems: 'center'}}>
          <Input
            placeholder="First Name"
            onChangeText={text => onChange({name: 'firstname', text})}
          />
          <Input
            placeholder="Last Name"
            onChangeText={text => onChange({name: 'lastname', text})}
          />
          <Input
            placeholder="Email"
            onChangeText={text => onChange({name: 'email', text})}
          />
          <Input
            placeholder="Phone Number"
            onChangeText={text => onChange({name: 'phoneNumber', text})}
          />
          <Input
            placeholder="Password"
            onChangeText={text => onChange({name: 'password', text})}
          />
        </View>
        <Button style={{marginTop: height(5)}} onPress={handleRegister}>Sign Up</Button>
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
