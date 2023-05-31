import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screen } from "../../utils";
import { FriendsScreen } from "../../screens/Friends/FriendsScreen";

const Stack = createNativeStackNavigator();

export const FriendsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.friends.friends} component={FriendsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
