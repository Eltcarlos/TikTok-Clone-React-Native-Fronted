import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screen } from "../../utils";
import { HomeScreen } from "../../screens/Home";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.home.home} component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
