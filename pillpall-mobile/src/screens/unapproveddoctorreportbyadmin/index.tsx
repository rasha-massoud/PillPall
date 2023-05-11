import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Body1Text from '../../components/Body1Text';
import axios from 'axios';
import DisplayData from '../../components/DisplayData';
import appStyles from '../../constants/appStyles';
import { useNavigation } from '@react-navigation/core';
import API_URL from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageTitle from '../../components/PageTitle';

import styles from './styles';

interface DoctorReportByAdminProps {
  route: {
    params: {
      doctorId: number;
    };
  };
}

interface Doctor {
  name: string;
  email: string;
  updated_at: Date;
  doctors_info: {
    phone_number: string;
    dob: string;
    address: string;
    gender: string;
    working_hours: string;
    major: string;
    certificates: string;
    expertise: string;
  };
}

const UnapprovedDoctorReportByAdmin: FC<DoctorReportByAdminProps> = ({ route }) => {
  const { doctorId } = route.params;
  const navigation = useNavigation();

  const [allResult, setAllResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem('token');
      setLoading(true);
      try {
        const endpoint = 'admin/get_doctor_report';
        const response = await axios.get<any>(`${API_URL}${endpoint}/${doctorId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setAllResult(response.data);
        if (response.data.status == 'success') {
          setIsSuccess(true);
        }
      } catch (error) {
        console.error('An error occurred while getting the report', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleBackPress = () => {
    navigation.navigate('UnapprovedDoctors' as never, {} as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <PageTitle title="PILLPALL" />
        </View>
        <View style={styles.topRight}>
          <Image source={require('../../../assets/logo.png')} style={styles.image} />
        </View>
      </View>
  
      {loading ? (
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      ) : (
        <ScrollView style={appStyles.body1}>

          {allResult && isSuccess && allResult.report && allResult.report.length > 0 ? (
            <ScrollView>
              <View>
                <Body1Text context="As an administrator, you are currently viewing the profile of a doctor who is yet to be approved on PillPall. Your diligence in the approval process will contribute to maintaining the trustworthiness of our platform among both doctors and patients." />          
                <DisplayData title="Name" value={allResult.doctor?.name} />
                <DisplayData title="Email" value={allResult.doctor?.email} />
                <DisplayData title="Phone Number" value={allResult.report?.[0]?.phone_number} />
                <DisplayData title="Date of Birth" value={allResult.report?.[0]?.dob} />
                <DisplayData title="Gender" value={allResult.report?.[0]?.gender} />
              </View>
  
              <View>
                <DisplayData title="Address" value={allResult.report?.[0]?.address} />
                <DisplayData title="Working hours" value={allResult.report?.[0]?.working_hours} />
              </View>
  
              <View>
                <DisplayData title="Major" value={allResult.report?.[0]?.major} />
                <DisplayData title="Certificates" value={allResult.report?.[0]?.certificates} />
                <DisplayData title="Expertise" value={allResult.report?.[0]?.expertise} />
              </View>
            </ScrollView>
          ) : (
            <View style = {styles.emptyText}>
              <Body1Text context={`No report yet for ${allResult?.doctor?.name}`} />
              <CustomButton containerStyle={{ alignSelf: 'center', height: 30, marginTop: 10 }} buttonprops={{ title: "Back", onPress: handleBackPress }} />
            </View>
          )}  
        </ScrollView>
      )}
    </SafeAreaView>
  );
  
  
};

export default UnapprovedDoctorReportByAdmin;