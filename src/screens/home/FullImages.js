import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {height, width} from '../../helper/Index';
import {Ionicons} from '../../common/Icons';

const FullImages = ({navigation, route}) => {
  const {images} = route.params;
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={images}
        keyExtractor={(t, i) => i.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) => (
          <View
            style={{
              width: width(100),
              height: height(100),
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item}}
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 2,
              }}
            />
          </View>
        )}
        scrollEventThrottle={16}
      />
      <Ionicons
        name="chevron-back-sharp"
        style={styles.icon}
        size={width(5)}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default FullImages;

const styles = StyleSheet.create({
  icon: {
    padding: height(1),
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 10,
    position: 'absolute',
    top: 10,
    left: 20,
    opacity: 0.5
  },
});
