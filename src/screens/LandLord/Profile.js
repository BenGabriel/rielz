import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/Button';
import {Ionicons} from '../../common/Icons';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';

const Profile = ({navigation}) => {
  const logOut = () => {
    navigation.replace('Details');
  };

  const navigateToHouses = () => {
    navigation.navigate('OwnerDashboard');
  };

  const navigateToAddHouses = () => {
    navigation.navigate('AddHouse');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={{width: '25%', height: '25%', marginVertical: height(4)}}
      />
      <View style={styles.userDetails}>
        <Ionicons name="person" size={width(5)} color={Colors.brown} />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          Name
        </Text>
      </View>
      <View style={styles.userDetails}>
        <Ionicons name="mail" size={width(5)} color={Colors.brown} />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          Email
        </Text>
      </View>
      <View style={styles.userDetails}>
        <Ionicons name="call" size={width(5)} color={Colors.brown} />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          Phone
        </Text>
      </View>
      <TouchableOpacity style={styles.userDetails} onPress={navigateToHouses}>
        <Ionicons name="home-outline" size={width(5)} color={Colors.brown} />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          My Houses
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userDetails}
        onPress={navigateToAddHouses}>
        <Ionicons
          name="add-circle-outline"
          size={width(5)}
          color={Colors.brown}
        />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          Add house
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userDetails} onPress={logOut}>
        <Ionicons name="log-out" size={width(5)} color={Colors.brown} />
        <Text
          style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
          Log Out
        </Text>
      </TouchableOpacity>
      <Button
        style={{
          marginTop: height(4),
          backgroundColor: '#59534d',
        }}
        onPress={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: height(8),
  },
  userDetails: {
    backgroundColor: '#fff',
    elevation: 1,
    width: '85%',
    marginVertical: height(1),
    padding: height(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
  },
});
