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
import {Colors, height, width} from '../../helper/Index';
import Location from '../../components/Location';
import Picker from '../../components/Picker';
import Styles from '../../helper/Styles';
// import ImagePicker from 'react-native-image-crop-picker';
import {NigeriaState} from '../../common/NigeriaState';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';
import EditScreensContainer from '../../components/EditScreensContainer';

const Add = ({navigation}) => {
  const [houseType, setHouseType] = useState('');
  const [state, setState] = useState('');
  const [display, setDisplay] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [images, setImages] = useState([]);
  const [houseDetails, setHouseDetails] = useState({
    description: '',
    rooms: '',
    bathroom: '',
    price: '',
    space
  });

  const {description, rooms, bathroom, price, space} = houseDetails;

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

  // const getImageFromGallery = () => {
  //   ImagePicker.openPicker({
  //     multiple: true,
  //   }).then(images => {
  //     console.log(images);
  //     const newImages = images.slice(0, 6);
  //     setImages(newImages);
  //   });
  // };

  const getImageFromGallery = type => {
    const options = {
      selectionLimit: 0,
    };
    if (images.length === 6) return alert('You cannot add more images');
    launchImageLibrary(options, response => {
      console.log('hi');
      if (response.assets) {
        console.log(response);
        setImages([...images, ...response.assets]);
      }
    });
  };

  const filterImage = value => {
    const newImage = images.filter(e => e.fileSize !== value.fileSize);
    setImages(newImage);
  };

  return (
    <EditScreensContainer navigation={navigation} title="Add House">
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
          value={description}
          multiline={true}
          style={styles.description}
          onChangeText={text =>
            setHouseDetails({...houseDetails, description: text})
          }
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{...styles.inputContainer, width: '30%'}}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            No. of rooms
          </Text>
          <TextInput
            value={rooms}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text =>
              setHouseDetails({...houseDetails, rooms: text})
            }
          />
        </View>
        <View style={{...styles.inputContainer, width: '30%'}}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            No. of Bathrooms
          </Text>
          <TextInput
            value={bathroom}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text =>
              setHouseDetails({...houseDetails, bathroom: text})
            }
          />
        </View>
        <View style={{...styles.inputContainer, width: '30%'}}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Available Space
          </Text>
          <TextInput
            value={space}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text =>
              setHouseDetails({...houseDetails, space: text})
            }
          />
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
        <TextInput
          value={price}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => setHouseDetails({...houseDetails, price: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text
          style={{
            ...Styles.text('#333', 1.8, true),
            marginBottom: height(1),
          }}>
          Gallery
        </Text>
        <ScrollView
          horizontal
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.addimage}
            onPress={() => getImageFromGallery()}>
            <Text style={Styles.text('#c4c4c4', 5, false)}>+</Text>
          </TouchableOpacity>
          {images.length !== 0 &&
            images.map((imageDet, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width(22),
                  height: height(10),
                  backgroundColor: '#F7F7F7',
                  marginLeft: 10,
                }}
                onPress={() => filterImage(imageDet)}>
                <Image
                  source={{uri: imageDet.uri}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <Button
        style={{
          marginVertical: height(6),
          marginTop: height(4),
          backgroundColor: Colors.brown,
        }}>
        Add House
      </Button>
      <Location
        setDisplay={setDisplay}
        display={display}
        setValue={setAddress}
        setLat={setLat}
        setLng={setLng}
      />
    </EditScreensContainer>
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
    paddingBottom: height(10),
  },
  addimage: {
    width: width(20),
    borderWidth: 1,
    borderColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
    height: height(10),
    borderRadius: 10,
  },
  description: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 10,
    height: 70,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
  },
});
