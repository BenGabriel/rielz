import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {height, Colors} from '../../helper/Index';
import {Ionicons} from '../../helper/Icons';
import {SharedElement} from 'react-navigation-shared-element';
import Styles from '../../helper/Styles';

const LandlordDetails = ({navigation}) => {
  //House Car
  const HouseCard = props => {
    const {item} = props;
    return (
      <View style={styles.houseCard}>
        <Text
          style={{
            ...Styles.text('white', 1.6, false),
            position: 'absolute',
            zIndex: 20,
            right: 0,
            padding: 6,
            paddingHorizontal: 10,
            backgroundColor: item % 2 === 0 ? 'red' : 'green',
            borderBottomLeftRadius: 10,
          }}>
          For rent {item}
        </Text>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.replace('Details', {
              screen: 'HouseDetails',
              params: {item},
            })
          }>
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
  return (
    <View style={{flex: 1, padding: height(2)}}>
      <View style={styles.textContainer}>
        <Text style={Styles.text('#000', 3.5, true)}>Chidi</Text>
        <Text style={{...Styles.text('#000', 3, true), marginTop: -10}}>Paul</Text>
        <Text style={Styles.text('#333', 1.6, false)}>
          simeongabriel@gmail.com
        </Text>
        <View style={styles.phone}>
          <Text style={Styles.text('#333', 1.6, false)}>09075663177</Text>
          <Ionicons
            name="call"
            size={10}
            color="#fff"
            style={{
              padding: 10,
              backgroundColor: '#997950',
              borderRadius: 100,
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <FlatList
        data={Array(10)}
        renderItem={({index}) => <HouseCard item={index} />}
        keyExtractor={() => Math.random(7)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LandlordDetails;

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
  textContainer: {
    marginBottom: height(3),
    marginTop: height(1),
    paddingHorizontal: height(1),
    height: height(20),
    justifyContent:'space-around'
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
