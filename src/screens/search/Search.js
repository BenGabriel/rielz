import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Ionicons} from '../../helper/Icons';
import {Colors, height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import {SharedElement} from 'react-navigation-shared-element';
import HouseCard from '../../helper/HouseCard';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);

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
      <FlatList
        data={Array(10)}
        renderItem={({index}) => <HouseCard item={index} navigation={navigation}/>}
        keyExtractor={() => Math.random(7)}
        showsVerticalScrollIndicator={false}
      />
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
