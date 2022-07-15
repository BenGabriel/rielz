import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, width} from '../../helper/Index';
import Location from '../../components/Location';
import Picker from '../../components/Picker';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../components/Button';
import EditScreensContainer from '../../components/EditScreensContainer';
import Typography from '../../components/Typography';
import Input from '../../components/Input';
import ImgToBase64 from 'react-native-image-base64';
import mime from 'mime';

const Add = ({navigation}) => {
  const [houseType, setHouseType] = useState('');
  const [state, setState] = useState('');
  const [display, setDisplay] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [images, setImages] = useState([]);
  const [basedImages, setBasedImages] = useState([]);

  const [houseDetails, setHouseDetails] = useState({
    description: '',
    rooms: '',
    bathroom: '',
    price: '',
    space,
  });

  const {space} = houseDetails;

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
      mediaType: 'photo',
    }).then(async images => {
      console.log(images);
      if (images.length < 6) {
        getImageFromGallery();
      } else {
        const newImages = images.slice(0, 6);
        setImages(newImages);
        const bases = await convertToBase(newImages);
        setBasedImages(bases)
        console.log(bases, 'top');
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

  // const getImageFromGallery = type => {
  //   const options = {
  //     selectionLimit: 0,
  //   };
  //   if (images.length === 6) return alert('You cannot add more images');
  //   launchImageLibrary(options, response => {
  //     console.log('hi');
  //     if (response.assets) {
  //       console.log(response);
  //       setImages([...images, ...response.assets]);
  //     }
  //   });
  // };

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
      <View style={styles.inputContainer}>
        <Typography
          text="Address"
          color="#333"
          size={1.8}
          bold
          style={styles.text}
        />
        <Input
          onFocus={() => setDisplay(true)}
          onChangeText={() => setDisplay(true)}
          value={address}
        />
      </View>
      <View style={styles.inputContainer}>
        <Typography
          text="Description"
          color="#333"
          size={1.8}
          bold
          style={styles.text}
        />
        <Input
          multiline
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
          <Typography
            text="No. of rooms"
            color="#333"
            size={1.8}
            bold
            style={styles.text}
          />
          <Input
            numeric
            onChangeText={text =>
              setHouseDetails({...houseDetails, rooms: text})
            }
          />
        </View>
        <View style={{...styles.inputContainer, width: '30%'}}>
          <Typography
            text="No. of Bathrooms"
            color="#333"
            size={1.8}
            bold
            style={styles.text}
          />
          <Input
            numeric
            onChangeText={text =>
              setHouseDetails({...houseDetails, bathroom: text})
            }
          />
        </View>
        <View style={{...styles.inputContainer, width: '30%'}}>
          <Typography
            text="Available Space"
            color="#333"
            size={1.8}
            bold
            style={styles.text}
          />
          <Input
            numeric
            onChangeText={text =>
              setHouseDetails({...houseDetails, space: text})
            }
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Typography
          text="Price"
          color="#333"
          size={1.8}
          bold
          style={styles.text}
        />
        <Input
          numeric
          onChangeText={text => setHouseDetails({...houseDetails, price: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Typography
          text="Gallery 5+"
          color="#333"
          size={1.8}
          bold
          style={styles.text}
        />
        <ScrollView
          horizontal
          style={{
            width: '100%',
          }}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.addimage}
            onPress={() => getImageFromGallery()}>
            <Typography text="+" color="#c4c4c4" size={5} />
          </TouchableOpacity>
          {images.length !== 0 &&
            images.map((imageDet, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.ImageContainer}
                onPress={() => filterImage(imageDet)}>
                <Image
                  source={{uri: imageDet.path}}
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
        }}>
        Add House
      </Button>
      <Location
        setDisplay={setDisplay}
        display={display}
        setValue={setAddress}
        setLat={setLat}
        setLng={setLng}
        setState={setState}
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
  inputContainer: {
    marginTop: height(1.5),
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
    height: 80,
    textAlignVertical: 'top',
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width(22),
    height: height(10),
    backgroundColor: '#F7F7F7',
    marginLeft: 10,
  },
  text: {
    marginBottom: height(1),
  },
});
