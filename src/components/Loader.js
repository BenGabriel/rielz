import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../helper/Index';

const Loader = ({state}) => {
  return (
    <Modal visible={state} transparent={true} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          animating={state}
        />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
