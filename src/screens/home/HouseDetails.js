import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons, FontAwesome5} from '../../helper/Icons';

const HouseDetails = ({navigation, route}) => {
  const {item} = route.params;

  const controlClick = () => {
    console.log('hi');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SharedElement id={`item.${item}.photo`}>
          <Image
            source={require('../../assets/images/image.jpg')}
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
          onPress={() => navigation.navigate('Direction')}
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
          onPress={() => navigation.navigate('Direction')}
        />
      </View>
      <View style={styles.secContainer}>
        <View style={styles.details}>
          <Text style={Styles.text(Colors.black, 1.8, true)}>house type</Text>
          <Text style={Styles.text(Colors.grey, 1.6, false)}>Location</Text>
          <View style={{flexDirection: 'row', marginTop: 6}}>
            <View style={styles.detailsIcons}>
              <Ionicons name="bed-outline" size={15} color={Colors.grey} />
              <Text style={Styles.text(Colors.grey, 1.5, false)}>4</Text>
            </View>
            <View style={styles.detailsIcons}>
              <FontAwesome5 name="bath" size={15} color={Colors.grey} />
              <Text style={Styles.text(Colors.grey, 1.5, false)}>2</Text>
            </View>
          </View>
        </View>
        <Text style={{...Styles.text('#aaa', 1.6, false), marginTop: -20}}>
          Clean and neat house with modern interior built in the midle of the
          city making it easier for you to access the city center
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{...Styles.text(Colors.black, 1.8, true), marginTop: 15}}>
            Gallery
          </Text>
          <Text
            style={{...Styles.text('#00f', 1.6, true), marginTop: 15}}
            onPress={() => navigation.navigate('FullImages')}>
            View All
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <FlatList
            data={Array(5)}
            keyExtractor={() => Math.random(7)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({index}) => (
              <TouchableOpacity
                style={styles.galleryContainer}
                activeOpacity={0.6}
                onPress={() => controlClick()}>
                <Image
                  source={require('../../assets/images/image.jpg')}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View>
            <Text style={Styles.text(Colors.grey, 1.7, false)}>Price</Text>
            <Text style={Styles.text(Colors.black, 2, true)}>₦900</Text>
          </View>
          <Ionicons
            name="call"
            size={20}
            color="#fff"
            style={{
              padding: 10,
              backgroundColor: '#997950',
              borderRadius: 100,
              marginLeft: 80,
            }}
          />
          <Text
            style={{
              ...Styles.text('blue', 2, true),
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('LandlordDetails')}>
            Chidi
          </Text>
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
