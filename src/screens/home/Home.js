import React from 'react';
import {FlatList, StyleSheet, Text, View, Animated} from 'react-native';
import {Colors, height, width} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {Ionicons} from '../../common/Icons';
import HouseCard from '../../components/HouseCard';
import Typography from '../../common/Typography';

const Home = ({navigation}) => {
  const val = new Animated.Value(height(60));
  const data = [...Array(12 - 1 + 1).keys()];

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
      <Typography text="Rielz" style={styles.rielzText}  size={3} bold/>
      <Animated.View style={[styles.secContainer]}>
        <FlatList
          data={data}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 35}} />}
        />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rielzText: {
    width: '30%',
    textAlign: 'center',
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#fff',
    marginTop: height(2),
    marginLeft: 20,
    padding: 5
  },
  secContainer: {
    width: width(100),
    padding: height(1.5),
    paddingTop: height(2),
  },
});
