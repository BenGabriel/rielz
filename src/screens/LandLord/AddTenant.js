import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {emailRegex, getSession, height, snackHandler} from '../../helper/Index';
import Styles from '../../helper/Styles';
import EditScreensContainer from '../../components/EditScreensContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import axios from 'axios';
import api from '../../helper/endpoint.json';

const AddTenant = ({navigation, route}) => {
  const [tenant, setTenant] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
  });

  const onChange = useCallback(
    ({name, value}) => {
      setError({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
      });
      setTenant({...tenant, [name]: value});
    },
    [tenant],
  );

  const handleSubmit = async () => {
    const newlast = tenant.lastName;
    console.log(newlast.length);
    if (tenant.firstName.length < 3)
      return setError({
        ...error,
        firstname: 'First name must be greater than 3 characters',
      });

    if (tenant.lastName.length < 3)
      return setError({
        ...error,
        lastname: 'Last name must be greater than 3 characters',
      });

    if (!emailRegex.test(tenant.email))
      return setError({...error, email: 'Enter a valid email'});

    if (tenant.phone.length < 11)
      return setError({...error, phone: 'Please enter a valid phone number'});

    try {
      setLoading(true);
      const token = await getSession();
      await axios.post(
        `${api.url}${api.post.houses}/tenant`,
        {
          firstname: tenant.firstName.trimEnd(),
          lastname: tenant.lastName.trimEnd(),
          phonenumber: tenant.phone.trimEnd(),
          email: tenant.email.trimEnd(),
          house_id: route.params.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      setLoading(false);
      snackHandler('Tenant added successfully');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Error adding tenant', 'error');
      }
    }
  };
  return (
    <EditScreensContainer navigation={navigation} title="Add Tenant">
      <View style={{marginTop: height(2), width: '90%', alignSelf: 'center'}}>
        <Text style={styles.text}>First Name</Text>
        <Input
          onChangeText={value => onChange({name: 'firstName', value})}
          error={error.firstname}
        />
        <Text style={styles.text}>Last Name</Text>
        <Input
          onChangeText={value => onChange({name: 'lastName', value})}
          error={error.lastname}
        />
        <Text style={styles.text}>Email</Text>
        <Input
          onChangeText={value => onChange({name: 'email', value})}
          error={error.email}
        />
        <Text style={styles.text}>Phone</Text>
        <Input
          onChangeText={value => onChange({name: 'phone', value})}
          numeric
          error={error.phone}
        />
      </View>
      <Button
        style={{
          marginTop: height(5),
        }}
        load={loading}
        disabled={loading}
        onPress={handleSubmit}>
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
