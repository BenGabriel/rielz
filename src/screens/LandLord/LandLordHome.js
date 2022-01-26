import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {SharedElement} from 'react-navigation-shared-element';

const {width} = Dimensions.get('window');

const item_size = width * 0.68;
const item_height = item_size * 1.5;
const full_size = item_size + 12 * 2;

const LandLordHome = ({navigation}) => {
  //card
  const Card = ({index, scrollX}) => {
    const inputRange = [
      (index - 1) * full_size,
      index * full_size,
      (index + 1) * full_size,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1.13, 0.9],
      extrapolate: 'clamp',
    });

    const TexttranslateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, 10, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('LandlordHouseDetails', {
            index,
          })
        }>
        <SharedElement
          id={`item.${index}.photo`}
          style={StyleSheet.absoluteFillObject}>
          <Animated.Image
            source={require('../../assets/images/image.jpg')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              transform: [{scale}],
              resizeMode: 'cover',
            }}
          />
        </SharedElement>
        <Animated.View
          style={{
            transform: [
              {
                translateY: TexttranslateY,
              },
            ],
            bottom: height(-50),
          }}>
          <Text
            style={{
              ...Styles.text('#333', 2, true),
              marginTop: height(4),
              textAlign: 'center',
            }}>
            House Type {index}
          </Text>
          <Text
            style={{
              ...Styles.text('#777', 1.7, false),
              marginTop: height(1),
              textAlign: 'center',
            }}>
            Location
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, padding: 10}}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          height: 25,
          width: 25,
        }}
      />
      <Text
        style={{
          ...Styles.text('#333', 2, true),
          marginLeft: height(6),
        }}>
        Welcome chidi paul
      </Text>
      {/* <Text style={{...Styles.text('#333', 2, true), marginTop: height(4), textAlign:'center'}}>Your houses</Text>
       */}
      <Animated.FlatList
        data={Array(30)}
        renderItem={({item, index}) => <Card index={index} scrollX={scrollX} />}
        horizontal
        scrollEventThrottle={300}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={full_size}
        decelerationRate={0}
        bounces={false}
      />
    </View>
  );
};

export default LandLordHome;

const styles = StyleSheet.create({
  card: {
    width: item_size,
    height: item_height,
    marginTop: height(10),
    margin: 12,
    alignItems: 'center',
  },
});
