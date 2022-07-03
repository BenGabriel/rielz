import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, height, width} from '../helper/Index';
import Styles from '../helper/Styles';
import {Ionicons} from '../common/Icons';

const EditScreensContainer = props => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>
      <View style={styles.navContainer}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={() => props.navigation.goBack()}
        />
        <Text
          style={{
            ...Styles.text('#fff', 2, true),
            marginLeft: height(11),
            textAlign: 'center',
          }}>
          {props.title}
        </Text>
      </View>
      <ScrollView
        style={styles.secContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {props.children}
      </ScrollView>
    </View>
  );
};

export default EditScreensContainer;

const styles = StyleSheet.create({
  navContainer: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: height(2),
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  secContainer: {
    flex: 1,
    marginTop: height(3),
    backgroundColor: '#fff',
    padding: height(2),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: height(3),
    paddingBottom: height(10),
  },
});
