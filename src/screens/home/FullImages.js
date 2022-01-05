import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {height, width} from '../../helper/Index';

const FullImages = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Array(5)}
        keyExtractor={() => Math.random(5)}
        horizontal
        pagingEnabled
        renderItem={({}) => (
          <View
            style={{
              width: width(100),
              height: height(100),
              backgroundColor: '#333',
              justifyContent:'center'
            }}>
            <View style={{width: '100%', height: '40%'}}>
              <Image
                source={require('../../assets/images/17.jpg')}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                  borderWidth: 2,
                }}
              />
            </View>
          </View>
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default FullImages;

const styles = StyleSheet.create({});
