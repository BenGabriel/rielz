import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {height, width} from '../../helper/Index';
import HouseCard from '../../components/HouseCard';
import Typography from '../../components/Typography';

const Home = ({navigation}) => {
  const data = [...Array(12 - 1 + 1).keys()];

  return (
    <View style={styles.container}>
      <Typography text="Rielz" style={styles.rielzText} size={2.4} bold />
      <View style={[styles.secContainer]}>
        <FlatList
          data={data}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 35}} />}
        />
      </View>
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
    width: '20%',
    textAlign: 'center',
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#fff',
    marginTop: height(2),
    marginLeft: 20,
    padding: 7,
  },
  secContainer: {
    width: width(100),
    padding: height(1.5),
    paddingTop: height(2),
    paddingBottom: height(4)
  },
});
