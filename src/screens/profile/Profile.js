import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '../../common/Icons';
import {
  Colors,
  getSession,
  height,
  snackHandler,
  width,
} from '../../helper/Index';
import Typography from '../../components/Typography';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import {logout, saveUser} from '../../redux/slice/slice';
import api from '../../helper/endpoint.json';
import axios from 'axios';
import {fetchUser} from '../../redux/actions';

const Profile = ({navigation}) => {
  const {users} = useSelector(state => state.appSlice);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const becomeLandlord = async () => {
    try {
      setLoading(true);
      const token = await getSession();
      await axios.put(
        `${api.url}${api.get.user}/${users.ID}`,
        {
          firstname: `${users.firstname.split(' ')[0]} Landlord`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      dispatch(fetchUser());
      setLoading(false);
      dispatch(saveUser('Landlord'));
      navigation.replace('Landlord');
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.message !== undefined) {
        snackHandler(`Error becoming a landlord`, 'error');
      } else {
        snackHandler('Error becoming a landlord', 'error');
      }
    }
  };

  const logUserOut = () => {
    dispatch(logout());
    navigation.replace('Details');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.editProfile}
        onPress={() =>
          navigation.navigate('Details', {
            screen: 'EditProfile',
          })
        }>
        <Typography text="Edit Profile" size={1.2} color="#fff" />
      </Pressable>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.content}>
            <Ionicons
              name="person-circle-outline"
              size={width(6)}
              color={Colors.black}
            />
            <Typography
              color={Colors.black}
              size={1.8}
              text="Full name : "
              bold
              style={styles.contentText}
            />
          </View>
          <Typography
            color={Colors.black}
            size={2}
            text={`${users?.firstname?.split(' ')[0]} ${users?.lastname}`}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.content}>
            <Ionicons name="mail" size={width(6)} color={Colors.black} />
            <Typography
              color={Colors.black}
              size={1.8}
              text="Email : "
              bold
              style={styles.contentText}
            />
          </View>
          <Typography color={Colors.black} size={2} text={users?.email} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.content}>
            <Ionicons name="call" size={width(6)} color={Colors.black} />
            <Typography
              color={Colors.black}
              size={1.8}
              text="Phone number : "
              bold
              style={styles.contentText}
            />
          </View>
          <Typography color={Colors.black} size={2} text={users?.phonenumber} />
        </View>
        <Button
          children="Become a landlord"
          style={{
            marginTop: height(3),
          }}
          onPress={becomeLandlord}
          load={loading}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: height(6),
          }}
          onPress={logUserOut}>
          <MaterialCommunityIcons
            name="logout"
            size={width(6)}
            color={Colors.black}
          />
          <Typography
            color={Colors.black}
            size={1.8}
            text="Logout"
            bold
            style={styles.contentText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: height(2),
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: width(30),
    height: width(30),
    marginVertical: height(1),
    alignSelf: 'center',
  },
  contentContainer: {
    padding: height(1),
  },
  content: {
    marginVertical: height(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {marginLeft: height(1)},
  editProfile: {
    paddingHorizontal: height(2),
    paddingVertical: height(1),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
