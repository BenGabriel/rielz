import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../common/Icons';
import HouseCard from '../../components/HouseCard';

const Home = ({navigation}) => {
  const val = new Animated.Value(height(60));
  const data = [...Array(12 - 1 + 1).keys()];
  const [actionButton, setActionButton] = React.useState(false);

  React.useEffect(() => {
    val.setValue(height(60));
  }, []);

  const animateValues = () =>
    Animated.timing(val, {
      toValue: height(95),
      duration: 500,
      useNativeDriver: false,
    }).start();

  const containerInterpolate = val.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            screen: 'Login',
          })
        }
        style={{
          left: width(85),
          top: 10,
          position: 'absolute',
        }}>
        <Ionicons name="enter" size={30} color="#fff" />
      </TouchableOpacity>
      <Text
        style={{
          ...Styles.text(Colors.primary, 3.5, true),
          ...styles.rielzText,
        }}>
        Rielz
      </Text>
      <View style={styles.topContainer}>
        <View
          style={{
            width: width(80),
            height: width(80),
            alignSelf: 'center',
            opacity: 0.5,
          }}>
          <Image
            source={require('../../assets/images/background.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
      <Animated.View
        style={[styles.secContainer, {height: containerInterpolate}]}>
        <FlatList
          data={data}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 30}} />}
          onScrollBeginDrag={() => {
            animateValues();
            setActionButton(true);
          }}
        />
      </Animated.View>
      {actionButton ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('Details', {
              screen: 'Login',
            })
          }>
          <Text
            style={{
              ...Styles.text(Colors.white, 3.5, true),
            }}>
            +
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
  },
  rielzText: {
    letterSpacing: 3,
    fontFamily: 'Comfortaa-Bold',
    lineHeight: 36,
    textAlign: 'center',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: height(17),
    elevation: 1,
    alignSelf: 'center',
    width: width(30),
  },
  topContainer: {
    width: '100%',
    marginTop: height(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secContainer: {
    width: width(100),
    backgroundColor: Colors.white,
    height: height(60),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: height(1.5),
    paddingTop: height(2),
    paddingBottom: 0,
    elevation: 2,
  },
  actionButton: {
    position: 'absolute',
    bottom: height(2),
    right: width(10),
    padding: width(2),
    backgroundColor: Colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    elevation: 7,
  },
});
