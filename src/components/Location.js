import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '../common/Icons';
import {Colors, height, width} from '../helper/Index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_API = 'AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA';

const Location = props => {
  const {setDisplay, display, setValue, setLat, setLng} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={display}
      onRequestClose={() => {
        setDisplay(false);
      }}>
      <View style={styles.modalView}>
        <View
          style={styles.modalBottomView}
          activeOpacity={0.5}
          onPress={() => setDisplay(false)}>
          <View
            style={{
              backgroundColor: '#59534d',
              marginVertical: height(3),
              marginHorizontal: 10,
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', marginTop: 20, marginBottom: 10}}>
              Enter Your Address
            </Text>
            <View
              style={{
                backgroundColor: '#f7f7f7',
                width: width(90),
                marginBottom: 10,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Ionicons
                name="search"
                size={width(5)}
                style={{marginLeft: 8, marginTop: height(2)}}
              />
              <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(data, 'data');
                  console.log(details, 'details');
                  setValue(data.description);
                  setLat(details.geometry.location.lat)
                  setLng(details.geometry.location.lng)
                  setDisplay(false);
                }}
                query={{
                  key: GOOGLE_API,
                  language: 'en',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Location;

const styles = StyleSheet.create({
  modalView: {
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalBottomView: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
});
