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
import HouseCard from '../../helper/HouseCard';

const LandlordDetails = ({navigation}) => {
  //House Car
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
        renderItem={({index}) => <HouseCard item={index} navigation={navigation}/>}
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
