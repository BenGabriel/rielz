import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Ionicons, FontAwesome5} from '../../common/Icons';
import {Colors, convertTocurrency, width} from '../../helper/Index';
import MapViewDirections from 'react-native-maps-directions';
import Styles from '../../helper/Styles';
import {SharedElement} from 'react-navigation-shared-element';
import {useRoute} from '@react-navigation/native';

const Direction = ({navigation}) => {
  const {item} = useRoute().params;
  useEffect(() => {
    requestPermissions();
    getLocation();
  }, []);
  const [locationState, setLocationState] = useState({
    origin: {
      latitude: 0,
      longitude: 0,
    },
  });

  const mapRef = useRef();
  const markerRef = useRef();

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        setLocationState({
          ...locationState,
          origin: {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          },
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message, 'hhh');
      },
      {timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          ref={mapRef}
          region={{
            latitude: locationState.origin.latitude,
            longitude: locationState.origin.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: locationState.origin.latitude,
              longitude: locationState.origin.longitude,
            }}
            ref={markerRef}>
            <Ionicons name="location-sharp" size={width(7)} color="#F69033" />
          </Marker>
          <Marker
            coordinate={{
              latitude: parseFloat(item.long_lat[1]),
              longitude: parseFloat(item.long_lat[0]),
            }}>
            <Ionicons name="home" size={width(6)} color="#F69033" />
          </Marker>
          <MapViewDirections
            origin={{
              latitude: locationState.origin.latitude,
              longitude: locationState.origin.longitude,
            }}
            destination={{
              latitude: parseFloat(item.long_lat[1]),
              longitude: parseFloat(item.long_lat[0]),
            }}
            apikey="AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA"
            strokeColor={Colors.primary}
            strokeWidth={3}
            optimizeWaypoints={true}
            // onStart={params => {}}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
            onError={errorMessage => {}}
          />
        </MapView>
        <Pressable
          style={styles.details}
          onPress={() =>
            navigation.replace('HouseDetails', {item: item.ID, details: item})
          }>
          <View style={styles.imageContainer}>
            <SharedElement id={`item.${item?.ID}.photo`}>
              <Image
                source={{uri: item.images[0]}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                }}
              />
            </SharedElement>
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={Styles.text(Colors.black, 1.6, true)}>
              {item.location}
            </Text>
            <Text
              style={{...Styles.text(Colors.black, 1.6, false), marginTop: 3}}>
              ₦{convertTocurrency(item.price)}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={styles.detailsIcons}>
                <Ionicons name="bed-outline" size={20} color="#542e22" />
                <Text style={Styles.text(Colors.grey, 1.5, false)}>
                  {item.rooms}
                </Text>
              </View>
              <View style={styles.detailsIcons}>
                <FontAwesome5 name="bath" size={16} color="#542e22" />
                <Text
                  style={{
                    ...Styles.text(Colors.grey, 1.5, false),
                    marginTop: 4.5,
                  }}>
                  {item.bathrooms}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Direction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 100,
  },
  details: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderTopEndRadius: 50,
    elevation: 10,
    padding: 20,
  },
  detailsIcons: {
    width: 40,
    alignItems: 'center',
  },
});
