import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Ionicons, FontAwesome5} from '../../common/Icons';
import Typography from '../../components/Typography';
import {
  Colors,
  convertTocurrency,
  getSession,
  height,
  width,
} from '../../helper/Index';
import Styles from '../../helper/Styles';
import api from '../../helper/endpoint.json';

const MyHouseDetails = ({navigation, route}) => {
  const {index, details} = route.params;
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHouse = async () => {
    const token = await getSession();
    setLoading(true);
    try {
      const {data} = await axios.get(
        `${api.url}${api.get.houses}/${details.ID}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setLoading(false);
      setTenants(data.tenants);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getHouse();
  }, []);

  return (
    <View
      style={{
        padding: height(2),
        paddingRight: height(0),
        paddingBottom: height(10),
      }}>
      <View style={styles.topNav}>
        <Ionicons
          name="chevron-back-sharp"
          style={styles.icon}
          size={width(5)}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={Styles.text('blue', 1.8, true)}
          onPress={() => navigation.navigate('EditHouse', {
            details
          })}>
          Edit
        </Text>
      </View>
      <ScrollView
        style={{padding: 10, paddingRight: height(0)}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={getHouse}
            refreshing={loading}
            colors={['blue', 'red', 'green', '#ffbf00']}
          />
        }>
        <Text style={Styles.text('#333', 2, true)}>{details.location}</Text>
        <Text style={{...Styles.text('#999', 1.8, true), marginTop: 8}}>
          {details.house_type}
        </Text>
        <View style={styles.secContainer}>
          <View
            style={{
              alignItems: 'center',
              height: height(60),
              width: '25%',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <Ionicons
              name="bed-outline"
              size={26}
              color={Colors.brown}
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>
              {details.rooms} bedroom
            </Text>
            <FontAwesome5
              name="bath"
              size={26}
              color={Colors.brown}
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>
              {details.bathrooms} bathroom
            </Text>
            <Ionicons
              name="location-sharp"
              size={26}
              color={Colors.brown}
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>{details.state}</Text>

            <Ionicons
              name="layers"
              size={26}
              color={Colors.brown}
              style={styles.secIcons}
            />
            <Text style={Styles.text('#333', 1.6, true)}>
              {details.available_rooms} Space
            </Text>
          </View>
          <SharedElement id={`item.${index}.photo`}>
            <Image
              // source={{uri: details.images[0]}}
            source={require("../../assets/images/image.jpg")}
              style={{
                width: width(65),
                height: height(50),
                resizeMode: 'cover',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }}
            />
          </SharedElement>
        </View>
        <Text
          style={{
            ...Styles.text('#888', 1.8, false),
            marginTop: height(1),
            width: '95%',
          }}>
          {details.description}
        </Text>
        <Text style={{...Styles.text(Colors.black, 1.8, true), marginTop: 15}}>
          Gallery
        </Text>
        <View style={{marginVertical: 20}}>
          <FlatList
            data={details.images}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.galleryContainer}
                activeOpacity={0.6}>
                <Image
                  // source={{uri: item}}
                  
            source={require("../../assets/images/image.jpg")}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            marginBottom: 30,
          }}>
          <Text style={Styles.text(Colors.grey, 1.7, false)}>Price</Text>
          <Text style={Styles.text(Colors.black, 2, true)}>
            ₦{convertTocurrency(details.price)}
          </Text>
        </View>
        <View style={{paddingRight: height(2), marginBottom: height(2)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: height(2),
            }}>
            <Text style={Styles.text(Colors.black, 1.8, true)}>Tenants</Text>
            {tenants.length >= details.available_rooms ? null : (
              <Text
                style={{...Styles.text('blue', 1.8, true), marginRight: 16}}
                onPress={() =>
                  navigation.navigate('AddTenant', {
                    id: details.ID,
                  })
                }>
                Add
              </Text>
            )}
          </View>

          {tenants?.map(i => (
            <View key={i.ID} style={styles.eachTenant}>
              <View style={styles.tenantInitial}>
                <Text
                  style={{
                    ...Styles.text(Colors.white, 1.8, true),
                  }}>
                  {i.firstname.slice(0, 1)}
                  {i.lastname.slice(0, 1)}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: height(2),
                }}>
                <Typography
                  text={`${i.firstname} ${i.lastname}`}
                  bold
                  color={Colors.black}
                  size={2}
                />
                <Typography
                  text={i.email}
                  color={Colors.black}
                  style={{
                    marginTop: 2,
                  }}
                  size={1.5}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

MyHouseDetails.sharedElements = (route, otherRoute, showing) => {
  const {index} = route.params;

  return [
    {
      id: `item.${index}.photo`,
      animation: 'fade',
    },
  ];
};

export default MyHouseDetails;

const styles = StyleSheet.create({
  topNav: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: height(1),
  },
  icon: {
    padding: height(1.5),
    borderRadius: 100,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  secContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height(1),
  },
  secIcons: {
    marginVertical: height(2),
    marginTop: height(4),
  },
  galleryContainer: {
    width: width(20),
    height: width(20),
    borderRadius: 10,
    marginRight: 10,
  },
  eachTenant: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height(1),
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    marginVertical: height(0.5),
  },
  tenantInitial: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Colors.brown,
  },
});
