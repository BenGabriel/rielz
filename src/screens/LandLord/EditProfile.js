import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import EditScreensContainer from '../../components/EditScreensContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';

const EditProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  const onChange = useCallback(
    ({name, value}) => {
      setUserProfile({...userProfile, [name]: value});
    },
    [userProfile],
  );

  return (
    <EditScreensContainer navigation={navigation} title="Edit Profile">
      <View style={{marginTop: height(2), width: '90%', alignSelf: 'center'}}>
        <Text style={styles.text}>First Name</Text>
        <Input onChangeText={value => onChange({name: 'firstName', value})} />
        <Text style={styles.text}>Last Name</Text>
        <Input onChangeText={value => onChange({name: 'lastName', value})} />
        <Text style={styles.text}>Phone</Text>
        <Input onChangeText={value => onChange({name: 'phone', value})} numeric />
      </View>
      <Button
        style={{
          marginTop: height(5),
        }}>
        Edit
      </Button>
    </EditScreensContainer>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  text: {
    ...Styles.text('#333', 1.8, true),
    marginLeft: height(1),
    marginTop: height(3),
  },
});
