import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen, LoginEmailScreen, RegisterEmailScreen } from "../screens/Auth";
import { useTheme } from "../hooks";
import { getNavigationTheme, screen } from "../utils";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const { theme } = useTheme();
  const MyTheme = getNavigationTheme(theme);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerTransparent: true }}>
        <Stack.Screen
          name={screen.auth.auth}
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={screen.auth.loginEmail} component={LoginEmailScreen} />
        <Stack.Screen name={screen.auth.registerEmail} component={RegisterEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
