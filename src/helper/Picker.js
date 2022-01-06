import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from './Styles';
import {MaterialCommunityIcons} from './Icons';
import {Colors, height, width} from './Index';

const Picker = props => {
  const {placeholder, value, item, setValue, style} = props;

  console.log(item);

  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{...Styles.pickerContainer, ...style}}
        activeOpacity={0.7}
        onPress={() => setVisible(true)}>
        <View>
          <Text style={styles.text}>{placeholder}</Text>
          <Text style={styles.text2}>{value}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-down"
          color={Colors.grey}
          size={width(6)}
        />
      </TouchableOpacity>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide">
        <Text
          style={{textAlign: 'center', color: '#f00', marginTop: height(2)}}
          onPress={() => setVisible(false)}>
          Close
        </Text>
        <FlatList
          data={item}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.eachItem}
              onPress={() => {
                setValue(item.value);
                setVisible(false);
              }}>
              <Text style={styles.text2}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  text: {
    ...Styles.text('#333', 1.7, true),
  },
  text2: {
    ...Styles.text('#333', 1.8, false),
    paddingVertical: 4,
  },
  eachItem: {
    padding: height(2),
  },
});
