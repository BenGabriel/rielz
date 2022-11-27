import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '../../common/Icons';
import {Colors, height, snackHandler} from '../../helper/Index';
import Styles from '../../helper/Styles';
import HouseCard from '../../components/HouseCard';
import {NigeriaState} from '../../helper/NigeriaState';
import Typography from '../../components/Typography';
import axios from 'axios';
import api from '../../helper/endpoint.json';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const [message, setMessage] = useState('Search for a house close to you');

  const data = [...Array(12 - 1 + 1).keys()];

  const searchHouse = async item => {
    try {
      setLoading(true);
      const data = await axios.get(`${api.url}${api.get.houses}/${item}`);
      if (data.data.length === 0) {
        snackHandler('No houses in this region yet', 'error');
        setMessage('No houses in this region yet');
      } else {
        setHouses(data.data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Error adding your house', 'error');
      }
    }
  };

  const changeVisibility = () => {
    setMessage('Search for a house close to you');
    setHouses([]);
    setModalVisible(!modalVisible);
  };

  const clickState = item => {
    changeVisibility();
    setSearch(item);
    searchHouse(item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by location"
          style={styles.input}
          value={search}
          onChangeText={text => setSearch(text)}
          onFocus={changeVisibility}
        />
        <Ionicons name="search" size={15} />
      </View>
      <View style={{flex: 1, width: '100%'}}>
        {loading ? (
          <Typography text="Loading" color="#333" size={1.8} bold />
        ) : houses.length === 0 ? (
          <Typography text={message} color="#333" size={1.8} bold />
        ) : (
          <FlatList
            data={houses}
            renderItem={({item}) => <HouseCard item={item} />}
            keyExtractor={item => `${item}`}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListFooterComponent={() => <View style={{padding: 40}} />}
          />
        )}
      </View>
      <Modal animationType="slide" visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <FlatList
            data={NigeriaState}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: height(2),
                  borderBottomWidth: 0.5,
                  borderColor: Colors.grey,
                }}
                onPress={() => clickState(item.value)}>
                <Typography text={item.value} color="#333" size={1.8} bold />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
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
