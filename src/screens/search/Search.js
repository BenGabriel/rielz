import React, {useState} from 'react';
import {StyleSheet, View, TextInput, FlatList} from 'react-native';
import {Ionicons} from '../../common/Icons';
import {height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import HouseCard from '../../components/HouseCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);

  const data = [...Array(12 - 1 + 1).keys()];

  const searchHouse = () => {
    console.log(search);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by location"
          style={styles.input}
          value={search}
          onChangeText={text => setSearch(text)}
          onEndEditing={searchHouse}
        />
        <Ionicons name="search" size={15} />
      </View>
      <View>
        {/* <FlatList
          data={data}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 40}} />}
        /> */}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: height(2),
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: '#333',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    paddingHorizontal: height(2),
    backgroundColor: '#eee',
    marginBottom: height(2),
  },
  input: {
    ...Styles.text('#333', 1.5, false),
    width: '80%',
    height: 40,
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
