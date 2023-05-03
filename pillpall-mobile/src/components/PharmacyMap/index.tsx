import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

interface Pharmacy {
    name: string;
    address: string;
    location: LatLng;
}

type LatLng = {
    latitude: number;
    longitude: number;
}

const PharmacyMap: FC = () => {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            });
            getNearbyPharmacies(latitude, longitude);
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const getNearbyPharmacies = async (latitude: number, longitude: number) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=pharmacy&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(endpoint);
        const pharmacies = response.data.results.map((result: any) => {
            return {
            name: result.name,
            address: result.vicinity,
            location: {
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng,
            },
            };
        });
        setPharmacies(pharmacies);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            showsUserLocation={true}
        >
            {pharmacies.map(pharmacy => (
                <Marker
                    key={pharmacy.name}
                    title={pharmacy.name}
                    description={pharmacy.address}
                    coordinate={{
                        latitude: pharmacy.location.latitude,
                        longitude: pharmacy.location.longitude,
                    }}
                />
            ))}
        </MapView>
        <Text style={{ alignSelf: 'center', backgroundColor: 'white', padding: 10 }}>
            Showing {pharmacies.length} nearby pharmacies
        </Text>
    </SafeAreaView>
  );
};

export default PharmacyMap;
