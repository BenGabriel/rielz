import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EditScreensContainer from '../../components/EditScreensContainer';
import Styles from '../../helper/Styles';
import {Colors, height, width} from '../../helper/Index';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';

const EditHouse = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [houseDetails, setHouseDetails] = useState({
    description: '',
    rooms: '',
    bathroom: '',
    price: '',
  });

  const {description, rooms, bathroom, price} = houseDetails;

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
    <EditScreensContainer title="Edit House" navigation={navigation}>
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
        <View style={{...styles.inputContainer, width: '45%'}}>
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
        <View style={{...styles.inputContainer, width: '45%'}}>
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
        Edit House
      </Button>
    </EditScreensContainer>
  );
};

export default EditHouse;

const styles = StyleSheet.create({
  description: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 10,
    height: 70,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
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
});
