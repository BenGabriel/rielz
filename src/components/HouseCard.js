import {Image, StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {height, Colors} from '../helper/Index';
import {Ionicons} from '../common/Icons';
import {useNavigation} from '@react-navigation/native';
import Typography from './Typography';

const HouseCard = ({item}) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.push('Details', {
      screen: 'HouseDetails',
      params: {item},
    });
  };

  return (
    <View
      style={{
        ...styles.houseCard,
        marginTop: item % 2 == 0 ? 20 : 50,
      }}>
      <Pressable style={styles.imageContainer} onPress={navigate}>
        <SharedElement id={`item.${item}.photo`}>
          <Image
            source={require('../assets/images/image.jpg')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
          />
        </SharedElement>
      </Pressable>
      <View style={styles.houseCardbottom}>
        <View style={{width: '45%'}}>
          <Typography size={1.6} color="#333" text="house type" />
          <Typography size={1.6} color="#333" text={`state ${item}`} />
          <Typography
            size={1.6}
            color={Colors.primary}
            text={`₦90${item}k`}
            style={{marginTop: 2}}
          />
        </View>
        <Ionicons
          name="location-sharp"
          size={18}
          style={{
            alignSelf: 'baseline',
            backgroundColor: 'white',
            elevation: 3,
            padding: 5,
            borderRadius: 100,
          }}
          color={Colors.primary}
          onPress={() =>
            navigation.navigate('Details', {
              screen: 'Direction',
            })
          }
        />
      </View>
    </View>
  );
};

export default HouseCard;

const styles = StyleSheet.create({
  houseCard: {
    width: '45%',
    // marginBottom: height(2),
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: height(1.5),
    height: height(27),
    marginBottom: -35,
  },
  imageContainer: {
    width: '99%',
    height: height(18),
    alignSelf: 'center',
  },
  houseCardbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    marginTop: height(1.5),
  },
});
