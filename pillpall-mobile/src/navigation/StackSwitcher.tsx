import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import PatientButtonTab from './PatientButtonTab';
import DoctorButtonTab from './DoctorButtonTab';
import AdminButtonTab from './AdminButtonTab';

import { WelcomePatientStack } from './PatientStacks';
import { ReportStack } from './PatientStacks';
import { MedicationScheduleStack } from './PatientStacks';
import { MedicalStack } from './PatientStacks';

import { WelcomeDoctorStack } from './DoctorStacks';
import { ProfileStack } from './DoctorStacks';
import { PatientStack } from './DoctorStacks';


import { PatientsStack } from './AdminStacks';
import { ApprovedDoctorsStack } from './AdminStacks';
import { UnapprovedDoctorsStack } from './AdminStacks';

interface RootState {
   report: {
      is_logged_in: string,
      first_login: string,
      role: string,
   };
}

const StackSwitcher = () => {
   
   const is_logged_in = useSelector(
      (state: RootState) => state.report.is_logged_in
   );
   const role = useSelector(
      (state: RootState) => state.report.role
   );
   const first_login = useSelector(
      (state: RootState) => state.report.first_login
   );

   if (is_logged_in === '0') {
      return (
         <NavigationContainer>
            <AuthNavigator />
         </NavigationContainer>
      );
   }

   if (is_logged_in === '1' && first_login === '1' && role === 'patient') {
      return (
         <NavigationContainer>
            <WelcomePatientStack />
         </NavigationContainer>
      );
   }

   if (is_logged_in === '1' && first_login === '0' && role === 'patient') {
      return (
         <NavigationContainer>
            <PatientButtonTab />
         </NavigationContainer>
      ) 
   }

   if (is_logged_in === '1' && first_login === '1' && role === 'doctor') {
      return (
         <NavigationContainer>
            <WelcomeDoctorStack />
         </NavigationContainer>
      );
   }

   if (is_logged_in === '1' && first_login === '0' && role === 'doctor') {
      return (
         <NavigationContainer>
            <DoctorButtonTab />
         </NavigationContainer>
      ) 
   }

   if (is_logged_in === '1' && role === 'admin') {
      return (
         <NavigationContainer>
            <AdminButtonTab />
         </NavigationContainer>
      ) 
   }

   return(
      <NavigationContainer>
         <AuthNavigator />
      </NavigationContainer>
   ) 
};

export default StackSwitcher;
