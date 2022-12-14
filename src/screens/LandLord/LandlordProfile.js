import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, height, width} from '../../helper/Index';
import {Ionicons, MaterialCommunityIcons} from '../../common/Icons';
import Typography from '../../components/Typography';
import Styles from '../../helper/Styles';
import {logout} from '../../redux/slice/slice';
import Button from '../../components/Button';

const LandlordProfile = ({navigation}) => {
  const {users} = useSelector(state => state.appSlice);
  const dispatch = useDispatch();

  const logUserOut = () => {
    dispatch(logout());
    navigation.replace('Details');
  };

  const addHouse = () => {
    navigation.navigate("AddHouse")
  }
  return (
    <View style={styles.container}>
      <View style={Styles.flexRowSpaceCenter}>
        <Ionicons
          name="chevron-back-outline"
          size={width(6)}
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
        <Pressable
          style={styles.editProfile}
          onPress={() =>
            navigation.navigate('Details', {
              screen: 'EditProfile',
            })
          }>
          <Typography text="Edit Profile" size={1.2} color="#fff" />
        </Pressable>
      </View>
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
          children="Add House"
          style={{
            marginTop: height(3),
          }}
          onPress={addHouse}
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

export default LandlordProfile;

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
  },
});
