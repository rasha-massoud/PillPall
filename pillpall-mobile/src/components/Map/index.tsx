import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import axios from 'axios';
import 'dotenv/config';

import styles from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Location = {
  latitude: number;
  longitude: number;
};

type Pharmacy = {
  name: string;
  location: Location;
};

type MapProps = {
  apiKey: string;
};

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const [region, setRegion] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    const getLocationAsync = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await getCurrentPositionAsync();
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      searchPharmacies(location.coords.latitude, location.coords.longitude);
    };
    getLocationAsync();
  }, []);

  const searchPharmacies = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://places.ls.hereapi.com/places/v1/discover/explore?at=${lat},${lon}&cat=700-7200-0000&size=6&apiKey=${process.env.HERE_API_KEY}`
        );
      const items = response.data.results.items;
      const pharmacies: Pharmacy[] = items.map((item: any) => {
        return {
          name: item.title,
          location: {
            latitude: item.position[0],
            longitude: item.position[1],
          },
        };
      });
      setPharmacies(pharmacies);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...region,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker coordinate={region} />
        {pharmacies.map(pharmacy => (
          <Marker
            key={pharmacy.name}
            coordinate={pharmacy.location}
            title={pharmacy.name}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
