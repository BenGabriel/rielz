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

const Home = ({navigation}) => {
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
            navigation.push('Details', {
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
          }}>
          Dream Home with Rielz
        </Text>
      </View>
      <View style={styles.secContainer}>
        <FlatList
          data={Array(10)}
          renderItem={({index}) => <HouseCard item={index} />}
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
