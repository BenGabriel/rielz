import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Ionicons, FontAwesome5} from '../../helper/Icons';
import {height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={{width: '50%', height: '50%'}}
      />
      <View style={styles.userDetails}>
        <Ionicons name="person" size={width(5)} color='#59534d' />
        <Text style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>Name</Text>
      </View>
      <View style={styles.userDetails}>
        <Ionicons name="mail" size={width(5)} color='#59534d' />
        <Text style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>Email</Text>
      </View>
      <View style={styles.userDetails}>
        <Ionicons name="call" size={width(5)} color='#59534d' />
        <Text style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>Phone</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  userDetails: {
    backgroundColor: '#fff',
    elevation: 1,
    width: '85%',
    marginVertical: height(1),
    padding: height(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:10
  },
});
