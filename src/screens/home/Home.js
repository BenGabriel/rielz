import React, {useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {height, width} from '../../helper/Index';
import HouseCard from '../../components/HouseCard';
import Typography from '../../components/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllHouses,
  fetchUser,
} from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.houseSlice);

  const loadAll = () => {
    dispatch(fetchUser());
    dispatch(fetchAllHouses());
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <View style={styles.container}>
      <Typography text="Rielz" style={styles.rielzText} size={2.4} bold />
      <View style={[styles.secContainer]}>
        <FlatList
          data={state.houses}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item.ID}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 35}} />}
          refreshControl={
            <RefreshControl
              onRefresh={loadAll}
              refreshing={state.loading}
              colors={['blue', 'red', 'green', '#ffbf00']}
            />
          }
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
    paddingBottom: height(4),
  },
});
