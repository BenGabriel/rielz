import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {height} from '../../helper/Index';
import Styles from '../../helper/Styles';
import EditScreensContainer from '../../components/EditScreensContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AddTenant = ({navigation}) => {
  const [tenant, setTenant] = useState({});
  const onChange = useCallback(
    ({name, value}) => {
      setTenant({...tenant, [name]: value});
    },
    [tenant],
  );
  return (
    <EditScreensContainer navigation={navigation} title="Add Tenant">
      <View style={{marginTop: height(2), width: '90%', alignSelf: 'center'}}>
        <Text style={styles.text}>First Name</Text>
        <Input onChangeText={value => onChange({name: 'firstName', value})} />
        <Text style={styles.text}>Last Name</Text>
        <Input onChangeText={value => onChange({name: 'lastName', value})} />
        <Text style={styles.text}>Email</Text>
        <Input onChangeText={value => onChange({name: 'email', value})} />
        <Text style={styles.text}>Phone</Text>
        <Input
          onChangeText={value => onChange({name: 'phone', value})}
          numeric
        />
      </View>
      <Button
        style={{
          marginTop: height(5),
        }}>
        Add
      </Button>
    </EditScreensContainer>
  );
};

export default AddTenant;

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
    marginLeft: height(1),
    marginTop: height(3),
  },
});
