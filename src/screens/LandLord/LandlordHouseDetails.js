import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Ionicons, FontAwesome5} from '../../helper/Icons';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';

const LandlordHouseDetails = ({navigation, route}) => {
  const {index} = route.params;
  console.log(index);
  return (
    <View style={{flex: 1, padding: height(2), paddingRight: height(0)}}>
      <View
        style={{
          width: '95%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: height(1),
        }}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={() => navigation.goBack()}
        />
        <Text style={Styles.text('blue', 1.8, true)}>Edit</Text>
      </View>
      <ScrollView
        style={{flex: 1, padding: 10, paddingRight: height(0)}}
        showsVerticalScrollIndicator={false}>
        <Text style={Styles.text('#333', 2, true)}>Location</Text>
        <Text style={{...Styles.text('#999', 1.8, true), marginTop: 8}}>
          House Type
        </Text>
        <View style={styles.secContainer}>
          <View
            style={{
              alignItems: 'center',
              height: '70%',
              width: '25%',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <Ionicons
              name="bed-outline"
              size={26}
              color="#59534d"
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>2 bedroom</Text>
            <FontAwesome5
              name="bath"
              size={26}
              color="#59534d"
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>1 bedroom</Text>
            <Ionicons
              name="location-sharp"
              size={26}
              color="#59534d"
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>Location</Text>
          </View>
          <SharedElement id={`item.${index}.photo`}>
            <Image
              source={require('../../assets/images/image.jpg')}
              style={{
                width: width(65),
                height: height(50),
                resizeMode: 'cover',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }}
            />
          </SharedElement>
        </View>
        <Text
          style={{
            ...Styles.text('#888', 1.8, false),
            marginTop: 25,
            width: '95%',
          }}>
          Clean and neat house with modern interior built in the midle of the
          city making it easier for you to access the city center
        </Text>
        <Text style={{...Styles.text(Colors.black, 1.8, true), marginTop: 15}}>
          Gallery
        </Text>
        <View style={{marginVertical: 20}}>
          <FlatList
            data={Array(5)}
            keyExtractor={() => Math.random(7)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({index}) => (
              <TouchableOpacity
                style={styles.galleryContainer}
                activeOpacity={0.6}>
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
            paddingHorizontal: 5,
            marginBottom: 30,
          }}>
          <Text style={Styles.text(Colors.grey, 1.7, false)}>Price</Text>
          <Text style={Styles.text(Colors.black, 2, true)}>₦900</Text>
        </View>
      </ScrollView>
    </View>
  );
};

LandlordHouseDetails.sharedElements = (route, otherRoute, showing) => {
  const {index} = route.params;

  return [
    {
      id: `item.${index}.photo`,
      animation: 'fade',
    },
  ];
};

export default LandlordHouseDetails;

const styles = StyleSheet.create({
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  secContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height(3),
  },
  secIcons: {
    marginVertical: height(2),
    marginTop: height(4),
  },
  galleryContainer: {
    width: width(20),
    height: width(20),
    borderRadius: 10,
    marginRight: 10,
  },
});
