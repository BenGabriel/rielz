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

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [searchLoad, setSearchLoad] = useState(false);
  //house card
  const HouseCard = props => {
    const {item} = props;
    return (
      <View style={styles.houseCard}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.push('Details', {
              screen: 'HouseDetails',
              params: {item},
            })
          }>
          <SharedElement id={`item.${item}.photo`}>
            <Image
              source={require('../../assets/images/image.jpg')}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
              }}
            />
          </SharedElement>
        </TouchableOpacity>
        <View style={styles.houseCardbottom}>
          <View style={{width: '45%'}}>
            <Text style={Styles.text('#333', 1.6, false)}>house type</Text>
            <Text style={Styles.text('#333', 1.6, false)}>state</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Ionicons name="bed-outline" size={20} color={Colors.primary} />
            <Text style={Styles.text(Colors.primary, 1.6, false)}>3</Text>
          </View>
          <Text
            style={{...Styles.text(Colors.primary, 1.6, false), marginTop: 2}}>
            ₦900k
          </Text>
          <Ionicons
            name="location-sharp"
            size={20}
            style={{
              alignSelf: 'baseline',
              backgroundColor: 'white',
              elevation: 3,
              padding: 5,
              borderRadius: 100,
            }}
            color={Colors.primary}
            onPress={() =>
              navigation.navigate('Details', {
                screen: 'Direction',
              })
            }
          />
        </View>
      </View>
    );
  };

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
        renderItem={({index}) => <HouseCard item={index} />}
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
