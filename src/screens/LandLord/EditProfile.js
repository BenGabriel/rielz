import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {getSession, height, snackHandler} from '../../helper/Index';
import Styles from '../../helper/Styles';
import EditScreensContainer from '../../components/EditScreensContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../helper/endpoint.json';
import axios from 'axios';
import {fetchUser} from '../../redux/actions';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.appSlice);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: user?.firstname,
    lastName: user?.lastname,
    phone: user?.phonenumber,
  });
  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    phone: '',
  });

  const onChange = useCallback(
    ({name, value}) => {
      setError({
        firstname: '',
        lastname: '',
        phone: '',
      });
      setUserProfile({...userProfile, [name]: value});
    },
    [userProfile],
  );

  const handleSubmit = async () => {
    if (userProfile.firstName.length < 3) {
      return setError({
        ...error,
        firstname: 'First name must be greater than 3 characters',
      });
    }
    if (userProfile.lastName.length < 3) {
      return setError({
        ...error,
        lastname: 'Last name must be greater than 3 characters',
      });
    }
    if (userProfile.phone.length < 11) {
      return setError({...error, phone: 'Please enter a valid phone number'});
    }

    try {
      setLoading(true);
      const token = await getSession();
      await axios.put(
        `${api.url}${api.get.user}/${user.ID}`,
        {
          firstname: userProfile.firstName.trimEnd(),
          lastname: userProfile.lastName.trimEnd(),
          phonenumber: userProfile.phone.trimEnd(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      setLoading(false);
      dispatch(fetchUser());
      snackHandler('User updated successfully');
      navigation.goBack()
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.message !== undefined) {
        snackHandler(`${error.response.data.message}`, 'error');
      } else {
        snackHandler('Error updating user profile', 'error');
      }
    }
  };
  return (
    <EditScreensContainer navigation={navigation} title="Edit Profile">
      <View style={{marginTop: height(2), width: '90%', alignSelf: 'center'}}>
        <Text style={styles.text}>First Name</Text>
        <Input
          value={userProfile.firstName}
          onChangeText={value => onChange({name: 'firstName', value})}
          error={error.firstname}
        />
        <Text style={styles.text}>Last Name</Text>
        <Input
          value={userProfile.lastName}
          onChangeText={value => onChange({name: 'lastName', value})}
          error={error.lastname}
        />
        <Text style={styles.text}>Phone</Text>
        <Input
          value={userProfile.phone}
          onChangeText={value => onChange({name: 'phone', value})}
          numeric
          error={error.phone}
          maxLength={11}
        />
      </View>
      <Button
        style={{
          marginTop: height(5),
        }}
        disabled={!userProfile.firstName || !userProfile.lastName}
        load={loading}
        onPress={handleSubmit}>
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
