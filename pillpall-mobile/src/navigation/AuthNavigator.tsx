import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Register from "../screens/register";
import ForgotPassword from '../screens/forgotpassword';
import ResetPassword from '../screens/resetpassword';


const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;