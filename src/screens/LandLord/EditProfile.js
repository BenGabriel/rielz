import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';
import {Colors, height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import EditScreensContainer from '../../helper/EditScreensContainer';
import Button from '../../helper/Button';

const EditProfile = ({navigation}) => {
  return (
    <EditScreensContainer navigation={navigation} title="Edit Profile">
      <Text style={{...styles.text, marginTop: height(4)}}>First Name</Text>
      <TextInput value="" style={styles.input} />
      <Text style={styles.text}>Last Name</Text>
      <TextInput value="" style={styles.input} />
      <Text style={styles.text}>Phone</Text>
      <TextInput value="" style={styles.input} />
      <Button
        style={{
          backgroundColor: Colors.brown,
          marginTop: height(5),
        }}>
        Edit
      </Button>
    </EditScreensContainer>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#c4c4c4',
    height: 46,
    borderRadius: 10,
    marginVertical: height(2),
    alignSelf: 'center',
  },
  text: {
    ...Styles.text('#333', 1.8, true),
    marginLeft: height(2),
  },
});
