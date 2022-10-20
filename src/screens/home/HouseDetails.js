import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View, Animated} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {
  Colors,
  convertTocurrency,
  getUser,
  height,
  width,
} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons, FontAwesome5} from '../../common/Icons';
import api from '../../helper/endpoint.json';
import axios from 'axios';

const HouseDetails = ({navigation, route}) => {
  const {item, details} = route.params;

  const [landLord, setLandLord] = useState(null);
  const [currentUserID, setCurrentUserID] = useState('');

  const getLandlord = async () => {
    try {
      const user = await getUser();
      const {data} = await axios.get(
        `${api.url}${api.get.user}/${details.user_id}`,
      );
      console.log(data);
      setCurrentUserID(user.ID);
      setLandLord({
        ID: data.ID,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phonenumber: data.phonenumber,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const val = new Animated.Value(50);

  const animateValues = () =>
    Animated.timing(val, {
      toValue: -10,
      duration: 800,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    getLandlord();
    animateValues();
  }, []);

  const mainInterpolate = val.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 400],
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SharedElement id={`item.${item}.photo`}>
          <Image
            source={{uri: details?.images[0]}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
          />
        </SharedElement>
        <Ionicons
          name="chevron-back-sharp"
          size={20}
          color={Colors.black}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: 8,
            backgroundColor: '#fff',
            borderRadius: 100,
            opacity: 0.7,
          }}
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="location-sharp"
          size={20}
          color={Colors.black}
          style={{
            position: 'absolute',
            bottom: 70,
            right: 20,
            padding: 8,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
          onPress={() =>
            navigation.navigate('Direction', {
              item: {...details, long_lat: details.long_lat.split(',')},
            })
          }
        />
      </View>
      <View style={styles.secContainer}>
        <Animated.View style={{...styles.details, marginTop: mainInterpolate}}>
          <View style={Styles.flexRowSpaceCenter}>
            <Text style={Styles.text(Colors.black, 1.8, true)}>
              {details.house_type}
            </Text>
            {currentUserID !== landLord?.ID && (
              <Text
                style={{
                  ...Styles.text('blue', 1.8, true),
                  textDecorationLine: 'underline',
                }}
                onPress={() =>
                  navigation.navigate('LandlordDetails', {
                    landLord,
                  })
                }>
                {landLord?.firstname}
              </Text>
            )}
          </View>
          <Text style={Styles.text(Colors.grey, 1.6, false)}>
            {details.location}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 6}}>
            <View style={styles.detailsIcons}>
              <Ionicons name="bed-outline" size={15} color={Colors.grey} />
              <Text style={Styles.text(Colors.grey, 1.5, false)}>
                {details.rooms}
              </Text>
            </View>
            <View style={styles.detailsIcons}>
              <FontAwesome5 name="bath" size={15} color={Colors.grey} />
              <Text style={Styles.text(Colors.grey, 1.5, false)}>
                {details.bathrooms}
              </Text>
            </View>
            <View style={styles.detailsIcons}>
              <Ionicons name="layers" size={15} color={Colors.grey} />
              <Text style={Styles.text(Colors.grey, 1.5, false)}>
                {details.available_rooms}
              </Text>
            </View>
            <Text
              style={[
                Styles.text(Colors.black, 1.8, true),
                {
                  flex: 1,
                  textAlign: 'right',
                },
              ]}>
              ₦{convertTocurrency(details.price)}
            </Text>
          </View>
        </Animated.View>
        <Text style={{...Styles.text('#aaa', 1.6, false), marginTop: -20}}>
          {details.description}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{...Styles.text(Colors.black, 1.8, true), marginTop: 15}}>
            Gallery
          </Text>
          <Text
            style={{...Styles.text('#00f', 1.6, true), marginTop: 15}}
            onPress={() =>
              navigation.navigate('FullImages', {
                images: details.images,
              })
            }>
            View All
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <FlatList
            data={details.images}
            keyExtractor={(t, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.galleryContainer}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

HouseDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {
      id: `item.${item}.photo`,
      animation: 'fade',
    },
  ];
};
export default HouseDetails;

const styles = StyleSheet.create({
  container: {
    padding: height(1),
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: height(45),
  },
  secContainer: {
    padding: height(2),
  },
  details: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
    top: -40,
    alignSelf: 'center',
    borderRadius: 15,
    padding: height(2),
  },
  detailsIcons: {
    flexDirection: 'row',
    borderWidth: 1,
    marginLeft: height(1),
    padding: 3,
    borderRadius: 8,
    borderColor: '#c4c4c4',
    justifyContent: 'space-around',
    width: 45,
  },
  galleryContainer: {
    width: width(20),
    height: width(20),
    borderRadius: 10,
    marginRight: 10,
  },
});
