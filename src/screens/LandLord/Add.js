import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ionicons} from '../../helper/Icons';
import {height, width} from '../../helper/Index';
import Location from '../../helper/Location';
import Picker from '../../helper/Picker';
import Styles from '../../helper/Styles';
import ImagePicker from 'react-native-image-crop-picker';
import { NigeriaState } from '../../helper/NigeriaState';

const Add = ({navigation}) => {
  const [houseType, setHouseType] = useState('');
  const [state, setState] = useState('');
  const [display, setDisplay] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [images, setImages] = useState([]);

  const types = [
    {
      id: 1,
      value: 'Duplex',
    },
    {
      id: 2,
      value: 'Flat',
    },
    {
      id: 3,
      value: 'Bungalow',
    },
  ];

  const getImageFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      console.log(images);
      const newImages = images.slice(0, 6);
      setImages(newImages);
    });
  };

  const filterImage = value => {
    const newImage = images.filter(e => e.size !== value.size);
    setImages(newImage);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#59534d'}}>
      <View style={styles.navContainer}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...Styles.text('#fff', 2, true),
            marginLeft: height(11),
            textAlign: 'center',
          }}>
          Add House
        </Text>
      </View>
      <ScrollView
        style={styles.secContainer}
        showsVerticalScrollIndicator={false}>
        <Picker
          placeholder="Select house type"
          item={types}
          value={houseType}
          setValue={setHouseType}
        />
        <View style={{...styles.inputContainer, marginBottom: height(3)}}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Address
          </Text>
          <TextInput
            value={address}
            style={styles.input}
            onFocus={() => setDisplay(true)}
            onChangeText={() => setDisplay(true)}
          />
        </View>
        <Picker
          placeholder="State"
          item={NigeriaState}
          value={state}
          setValue={setState}
        />
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Description
          </Text>
          <TextInput
            value=""
            multiline={true}
            style={{
              ...Styles.text('#333', 1.6, false),
              borderWidth: 0.5,
              borderColor: '#333',
              borderRadius: 10,
              height: 70,
              textAlignVertical: 'top',
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{...styles.inputContainer, width: '45%'}}>
            <Text
              style={{
                ...Styles.text('#333', 1.8, true),
                marginBottom: height(1),
              }}>
              No. of rooms
            </Text>
            <TextInput value="" style={styles.input} keyboardType="numeric" />
          </View>
          <View style={{...styles.inputContainer, width: '45%'}}>
            <Text
              style={{
                ...Styles.text('#333', 1.8, true),
                marginBottom: height(1),
              }}>
              No. of Bathrooms
            </Text>
            <TextInput value="" style={styles.input} keyboardType="numeric" />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Price
          </Text>
          <TextInput value="" style={styles.input} keyboardType="numeric" />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Gallery
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {images.length === 0 ? (
              <TouchableOpacity
                style={styles.addimage}
                onPress={() => getImageFromGallery()}>
                <Text style={Styles.text('#c4c4c4', 5, false)}>+</Text>
              </TouchableOpacity>
            ) : (
              images.map(imageDet => (
                <TouchableOpacity
                  key={imageDet.size}
                  activeOpacity={0.8}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width(22),
                    height: height(11),
                    backgroundColor: '#F7F7F7',
                    marginTop: height(2),
                    marginRight: 10,
                  }}
                  onPress={() => filterImage(imageDet)}>
                  <Image
                    source={{uri: imageDet.path}}
                    style={{
                      width: width(22),
                      height: height(11),
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <Location
        setDisplay={setDisplay}
        display={display}
        setValue={setAddress}
        setLat={setLat}
        setLng={setLng}
      />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  navContainer: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: height(2),
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  input: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 46,
  },
  inputContainer: {
    marginTop: height(2),
  },
  secContainer: {
    flex: 1,
    marginTop: height(3),
    backgroundColor: '#fff',
    padding: height(2),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: height(3),
    paddingBottom: height(10)
  },
  addimage: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
    height: height(10),
    borderRadius: 10,
  },
});
