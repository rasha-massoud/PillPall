import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import PatientButtonTab from "./PatientButtonTab";
import DoctorButtonTab from "./DoctorButtonTab";

// import { WelcomePatientStack, ReportStack, MedicationScheduleStack, MedicalStack } from './PatientStacks';
// import { WelcomeDoctorStack, ProfileStack, PatientStack } from './DoctorStacks';

interface RootState {
   report: {
      first_login: string,
      role: string,
   };
}

const StackSwitcher = () => {
   const role = useSelector(
      (state: RootState) => state.report.role
   );
   const first_login = useSelector(
      (state: RootState) => state.report.first_login
   );
   return (
      <NavigationContainer>
      {/* {authSlice.isloggedin ? <AppStack /> : <OnboardingStack />} */}
      </NavigationContainer>
   );
};

export default StackSwitcher;