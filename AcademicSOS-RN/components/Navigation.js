import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../presentation/HomeScreen.js";
import LoginScreen from "../presentation/LoginScreen.js";
import PriorityPointScreen from "../presentation/PriorityPointScreen.js";
import BookConsultScreen from "../presentation/BookConsultScreen.js";
import PublicConsultScreen from "../presentation/PublicConsultScreen.js";
import ManageBookingScreen from "../presentation/ManageBookingScreen.js";
import CreateConsultScreen from "../presentation/CreateConsultScreen.js";
import ConsultDetailScreen from "../presentation/ConsultDetailScreen.js";
// import SelectModuleScreen from "../presentation/SelectModuleScreen.js";

// Gets the current screen from navigation state
const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const Stack = createStackNavigator();

export default function Navigation() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          alert(`The route changed to ${currentRouteName}`);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Select Module" component={SelectModuleScreen} /> */}
        <Stack.Screen name="Book Consult" component={BookConsultScreen} />
        <Stack.Screen name="Public Consult" component={PublicConsultScreen} />
        <Stack.Screen name="Priority Point" component={PriorityPointScreen} />
        <Stack.Screen name="Bookings" component={ManageBookingScreen} />
        <Stack.Screen name="Create Consult" component={CreateConsultScreen} />
        <Stack.Screen name="Consult Details" component={ConsultDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
