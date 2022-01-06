import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Ionicons, FontAwesome5} from '../../helper/Icons';
import {Colors, height, width} from '../../helper/Index';
import Picker from '../../helper/Picker';
import Styles from '../../helper/Styles';

const Add = ({navigation}) => {
  const [houseType, setHouseType] = useState('');

  const types = [
    {
      id: 1,
      value: 'Duplex',
    },
    {
      id: 2,
      value: 'Flat',
    },
    {
      id: 3,
      value: 'Bungalow',
    },
  ];

  return (
    <View style={{flex: 1, padding: height(2)}}>
      <View style={styles.navContainer}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...Styles.text('#000', 2, true),
            marginLeft: height(11),
            textAlign: 'center',
          }}>
          Add House
        </Text>
      </View>
      <ScrollView
        style={{flex: 1, marginTop: height(3)}}
        showsVerticalScrollIndicator={false}>
        <Picker
          placeholder="Select house type"
          item={types}
          value={houseType}
          setValue={setHouseType}
        />
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Location
          </Text>
          <TextInput value="" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Description
          </Text>
          <TextInput
            value=""
            multiline={true}
            style={{
              ...Styles.text('#333', 1.6, false),
              borderWidth: 0.5,
              borderColor: '#333',
              borderRadius: 10,
              height: 70,
              textAlignVertical: 'top',
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{...styles.inputContainer, width: '45%'}}>
            <Text
              style={{
                ...Styles.text('#333', 1.8, true),
                marginBottom: height(1),
              }}>
              No. of rooms
            </Text>
            <TextInput value="" style={styles.input} keyboardType="numeric" />
          </View>
          <View style={{...styles.inputContainer, width: '45%'}}>
            <Text
              style={{
                ...Styles.text('#333', 1.8, true),
                marginBottom: height(1),
              }}>
              Bathroom
            </Text>
            <TextInput value="" style={styles.input} keyboardType="numeric" />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              ...Styles.text('#333', 1.8, true),
              marginBottom: height(1),
            }}>
            Price
          </Text>
          <TextInput value="" style={styles.input} keyboardType="numeric" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  navContainer: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: height(1),
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  input: {
    ...Styles.text('#333', 1.6, false),
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 46,
  },
  inputContainer: {
    marginTop: height(2),
  },
});
