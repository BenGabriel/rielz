import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, width as it} from '../../helper/Index';
import {SharedElement} from 'react-navigation-shared-element';
import {Ionicons} from '../../common/Icons';
import Typography from '../../components/Typography';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const item_width = width * 0.6;
const item_height = item_width * 1.5;

const UserHome = ({navigation}) => {
  const state = useSelector(state => state.houseSlice);

  console.log(state);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  //card
  const Card = ({index, scrollX}) => {
    const inputRange = [
      (index - 1) * item_width,
      index * item_width,
      (index + 1) * item_width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1.13, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Details', {
            screen: 'MyHouseDetails',
            params: {
              index,
            },
          })
        }>
        <SharedElement
          id={`item.${index}.photo`}
          style={{height: item_height, width: item_width, padding: 12}}>
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
            opacity,
            marginTop: 10,
          }}>
          <Typography
            text="House Type"
            bold
            size={2}
            style={{
              marginTop: height(4),
            }}
          />
          <Typography
            text="location"
            size={1.7}
            color="#777"
            style={{
              marginTop: height(1),
              textAlign: 'center',
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <Ionicons
        name="chevron-back-sharp"
        style={styles.icon}
        size={it(5)}
        onPress={() => navigation.goBack()}
      />

      {state.landlordHouses.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Typography
            text="No house added!!"
            bold
            size={2}
            style={{
              marginTop: height(4),
            }}
          />
          <Ionicons
            name="add"
            style={[styles.icon, {alignSelf:'center', marginLeft: 0}]}
            size={it(5)}
            onPress={() => navigation.navigate('AddHouse')}
          />
        </View>
      ) : (
        <Animated.FlatList
          data={Array(30)}
          renderItem={({item, index}) => (
            <Card index={index} scrollX={scrollX} />
          )}
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          snapToInterval={item_width}
          decelerationRate={0}
        />
      )}
    </View>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  card: {
    width: item_width,
    marginTop: height(8),
    alignItems: 'center',
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginTop: height(2),
    marginLeft: height(3),
    elevation: 2,
  },
});
