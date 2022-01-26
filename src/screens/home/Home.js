import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../helper/Icons';
import {SharedElement} from 'react-navigation-shared-element';
import HouseCard from '../../helper/HouseCard';

const Home = ({navigation}) => {
  

  return (
    <View style={styles.container}>
      <View style={styles.name} />
      <View style={styles.name2} />
      <View style={styles.name3} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            screen: 'Login',
          })
        }
        style={{
          left: width(85),
          top: 10,
        }}>
        <Ionicons name="enter" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        <Text
          style={{
            ...Styles.text(Colors.white, 2.4, true),
            letterSpacing: 1,
            fontFamily: 'Comfortaa-Bold',
            lineHeight: 36,
            textAlign: 'center',
          }}>
          Find Your
        </Text>
        <Text
          style={{
            ...Styles.text(Colors.white, 2.8, true),
            letterSpacing: 1,
            fontFamily: 'Comfortaa-Bold',
            lineHeight: 26,
            textAlign: 'center',
          }}>
          Dream Home with Rielz
        </Text>
      </View>
      <View style={styles.secContainer}>
        <FlatList
          data={Array(10)}
          renderItem={({index}) => <HouseCard item={index} navigation={navigation} />}
          keyExtractor={() => Math.random(7)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
  },
  name: {
    width: 400,
    height: 230,
    backgroundColor: 'white',
    opacity: 0.3,
    borderRadius: 200,
    position: 'absolute',
    right: -210,
  },
  name2: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    opacity: 0.3,
    borderRadius: 200,
    position: 'absolute',
    left: -40,
    top: 100,
  },
  name3: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    opacity: 0.3,
    borderRadius: 200,
    position: 'absolute',
    top: -40,
  },
  topContainer: {
    marginHorizontal: height(4),
    width: '90%',
    marginVertical: height(3),
  },
  secContainer: {
    width: width(100),
    backgroundColor: Colors.white,
    height: height(70),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: height(3),
    paddingTop: height(4),
    paddingBottom: 0,
  },
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
