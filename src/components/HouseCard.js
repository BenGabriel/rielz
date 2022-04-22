import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import Styles from '../helper/Styles';
import {height, Colors} from '../helper/Index';
import {Ionicons} from '../common/Icons';
import {useNavigation} from '@react-navigation/native';

const HouseCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styles.houseCard,
        marginTop: item % 2 == 0 ? 20 : 50,
      }}>
      <Pressable
        style={styles.imageContainer}
        onPress={() =>
          navigation.push('Details', {
            screen: 'HouseDetails',
            params: {item},
          })
        }>
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
          <Text style={Styles.text('#333', 1.6, false)}>house type</Text>
          <Text style={Styles.text('#333', 1.6, false)}>state{item}</Text>
          <Text
            style={{...Styles.text(Colors.primary, 1.6, false), marginTop: 2}}>
            ₦900k
          </Text>
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
    width: '90%',
    alignSelf: 'center',
    marginTop: height(1.5),
  },
});
