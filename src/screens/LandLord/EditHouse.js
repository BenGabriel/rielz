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
import {getSession, height, snackHandler, width} from '../../helper/Index';
import Button from '../../components/Button';
import api from '../../helper/endpoint.json';
import {useDispatch} from 'react-redux';
import {fetchLandlordHouses} from '../../redux/actions';
import axios from 'axios';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';

const EditHouse = ({navigation, route: {params}}) => {
  const dispatch = useDispatch();
  const {details} = params;
  console.log(details);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(details.images);
  const [basedImages, setBasedImages] = useState(details.images);
  const [houseDetails, setHouseDetails] = useState({
    description: details.description,
    rooms: details.available_rooms.toString(),
    bathroom: details.bathrooms.toString(),
    price: details.price.toString(),
  });

  const {description, rooms, bathroom, price} = houseDetails;

  const getImageFromGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(async images => {
      if (images.length < 3) {
        getImageFromGallery();
      } else {
        const newImages = images.slice(0, 6);
        setImages(newImages);
        const bases = await convertToBase(newImages);
        setBasedImages(bases);
      }
    });
  };

  const convertToBase = async array => {
    let source = [];
    for (let i = 0; i < array.length; i++) {
      let image = array[i];
      let type = mime.getType(image.path);
      const base = await ImgToBase64.getBase64String(image.path);
      source.push(`data:${type};base64,` + base);
    }
    return source;
  };

  const filterImage = value => {
    const newImage = images.filter(e => e.fileSize !== value.fileSize);
    setImages(newImage);
  };

  const editHouse = async () => {
    const token = await getSession();
    try {
      setLoading(true);
      const data = await axios.put(
        `${api.url}${api.post.houses}/${details.ID}`,
        {
          description: houseDetails.description,
          available_rooms: parseInt(houseDetails.space),
          bathrooms: parseInt(houseDetails.bathroom),
          price: parseInt(houseDetails.price.replace(/,/g, '')),
          images: basedImages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );
      setLoading(false);
      dispatch(fetchLandlordHouses());
      snackHandler(data.data.message);
      navigation.navigate('OwnerDashboard');
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Error Editing your house', 'error');
      }
    }
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
            Available rooms
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
          }}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.addimage}
            onPress={() => getImageFromGallery()}>
            <Text style={Styles.text('#c4c4c4', 5, false)}>+</Text>
          </TouchableOpacity>
          {images.length !== 0 &&
            basedImages.map((imageDet, index) => (
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
                  source={{uri: imageDet}}
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
        }}
        onPress={editHouse}
        load={loading}>
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
