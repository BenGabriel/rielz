import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Ionicons} from '../../common/Icons';
import Geolocation from 'react-native-geolocation-service';
import {width} from '../../helper/Index';

const Map = ({navigation}) => {
  useEffect(() => {
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

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log(info, 'postion');
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

  const coordinates = [
    {
      latitude: 6.3935288,
      longitude: 7.5029666,
    },
    {
      latitude: 6.3940908,
      longitude: 7.5028977,
    },
    {
      latitude: 6.2451,
      longitude: 7.3123,
    },
  ];
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // liteMode={true}
          showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: locationState.origin.latitude,
              longitude: locationState.origin.longitude,
            }}
            ref={markerRef}
            onPress={coordinate => console.log(coordinate.nativeEvent)}>
            <Ionicons name="location-sharp" size={width(7)} color="#F69033" />
          </Marker>
          {coordinates.map(data => (
            <Marker
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              ref={markerRef}
              key={data.latitude}
              onPress={coordinate => console.log(coordinate.nativeEvent)}>
              <Ionicons name="location-sharp" size={width(7)} color="#F69033" />
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
};

export default Map;

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
});
