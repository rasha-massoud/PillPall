import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login";
import Register from "../screens/register";

const OnboardingStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;