import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import Styles from './Styles';
import { height, Colors } from './Index';
import {Ionicons} from './Icons';

const HouseCard = ({navigation, item}) => {
  return (
    <View style={styles.houseCard}>
      <TouchableOpacity
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
      </TouchableOpacity>
      <View style={styles.houseCardbottom}>
        <View style={{width: '45%'}}>
          <Text style={Styles.text('#333', 1.6, false)}>house type</Text>
          <Text style={Styles.text('#333', 1.6, false)}>state</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Ionicons name="bed-outline" size={20} color={Colors.primary} />
          <Text style={Styles.text(Colors.primary, 1.6, false)}>3</Text>
        </View>
        <Text
          style={{...Styles.text(Colors.primary, 1.6, false), marginTop: 2}}>
          ₦900k
        </Text>
        <Ionicons
          name="location-sharp"
          size={20}
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
    imageContainer: {
        width: '100%',
        height: height(20),
      },
      houseCard: {
        width: '99%',
        marginBottom: height(2),
        elevation: 2,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
      },
      houseCardbottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        marginTop: 6,
      },
});
