import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import {Ionicons} from '../../common/Icons';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import Typography from '../../components/Typography';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.appSlice);

  

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
      <View
        style={{
          width: width(100),
          ...Styles.flexRowSpace,
          paddingHorizontal: height(3),
          marginBottom: height(10),
          marginTop: height(3),
        }}>
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
          style={{width: 70, height: 70}}
        />
        <View style={{alignItems: 'flex-end'}}>
          <Typography
            text={`${user?.firstname} ${user?.lastname}`}
            size={1.8}
            style={{marginLeft: height(4)}}
          />
          <Typography
            text={user?.email}
            size={1.8}
            style={{marginLeft: height(4)}}
          />
          <Typography text={user?.phonenumber} size={1.8} style={{marginLeft: height(4)}} />
          <Pressable
            style={styles.editProfile}
            onPress={() => navigation.navigate('EditProfile')}>
            <Typography text="Edit Profile" size={1.2} color="#fff" />
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
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
        <TouchableOpacity style={styles.userDetails} onPress={navigateToHouses}>
          <Ionicons name="home-outline" size={width(5)} color={Colors.brown} />
          <Text
            style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
            My Houses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userDetails} onPress={logOut}>
          <Ionicons name="log-out" size={width(5)} color={Colors.brown} />
          <Text
            style={{...Styles.text('#333', 1.8, false), marginLeft: height(4)}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  userDetails: {
    backgroundColor: '#f4f4f4',
    elevation: 1,
    width: '85%',
    marginVertical: height(1),
    padding: height(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
  },
  editProfile: {
    paddingHorizontal: height(2),
    paddingVertical: height(1),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 10,
  },
  body: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    height: height(74),
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
});
