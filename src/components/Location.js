import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '../common/Icons';
import {Colors, height, width} from '../helper/Index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_API = 'AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA';
const Location = props => {
  const {setDisplay, display, setValue, setLat, setLng, setState} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={display}
      onRequestClose={() => {
        setDisplay(false);
      }}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          <Text style={{color: '#fff', marginVertical: 10}}>
            Enter Your Address
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="search"
              size={width(4)}
              style={{marginHorizontal: 5, marginTop: height(1.5)}}
            />
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              keyboardShouldPersistTaps="handled"
              autoFocus={false}
              returnKeyType={'default'}
              onPress={(data, details = null) => {
                const city = details.address_components.filter(
                  a => a.types[0] === 'administrative_area_level_1',
                )[0]?.long_name;
                setValue(data.description);
                setLat(details.geometry.location.lat);
                setLng(details.geometry.location.lng);
                setDisplay(false);
                setState(city);
              }}
              query={{
                key: GOOGLE_API,
                language: 'en',
                components: 'country:ng',
              }}
            />
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
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    backgroundColor: '#f7f7f7',
    width: width(90),
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
});
