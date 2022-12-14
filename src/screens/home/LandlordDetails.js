import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
} from 'react-native';
import {height, Colors} from '../../helper/Index';
import {Ionicons} from '../../common/Icons';
import Styles from '../../helper/Styles';
import HouseCard from '../../components/HouseCard';
import api from '../../helper/endpoint.json';
import axios from 'axios';

const LandlordDetails = ({route}) => {
  const {landLord} = route.params;
  const [landLordHouses, setLandLordHouses] = useState([]);

  const getLandlordHouse = async () => {
    try {
      const {data} = await axios.get(
        `${api.url}${api.get.getLandlord}/${landLord.ID}`,
      );
      setLandLordHouses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLandlordHouse();
  }, []);

  return (
    <View style={{flex: 1, padding: height(2)}}>
      <View style={styles.textContainer}>
        <Text style={Styles.text('#000', 3.5, true)}>{landLord.firstname}</Text>
        <Text style={{...Styles.text('#000', 3, true), marginTop: -10}}>
          {landLord.lastname}
        </Text>
        <Text style={Styles.text('#333', 1.6, false)}>{landLord.email}</Text>
        <View style={styles.phone}>
          <Text style={Styles.text('#333', 1.6, false)}>
            {landLord.phonenumber}
          </Text>
          <Ionicons
            name="call"
            size={10}
            color="#fff"
            style={{
              padding: 10,
              backgroundColor: '#997950',
              borderRadius: 100,
              marginLeft: 10,
            }}
            onPress={() => Linking.openURL(`tel:${landLord.phonenumber}`)}
          />
        </View>
      </View>
      {landLordHouses.length === 0 ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <FlatList
          data={landLordHouses}
          renderItem={({item}) => <HouseCard item={item} />}
          keyExtractor={item => `${item.ID}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListFooterComponent={() => <View style={{padding: 30}} />}
        />
      )}
    </View>
  );
};

export default LandlordDetails;

const styles = StyleSheet.create({
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
  textContainer: {
    marginBottom: height(3),
    marginTop: height(1),
    paddingHorizontal: height(1),
    height: height(20),
    justifyContent: 'space-around',
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
