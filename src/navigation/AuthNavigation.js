import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "../screens/Auth";
import { useTheme } from "../hooks";
import { getNavigationTheme } from "../utils";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const { theme } = useTheme();
  const MyTheme = getNavigationTheme(theme);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
