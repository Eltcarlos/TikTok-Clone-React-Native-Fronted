import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screen } from "../../utils";
import { NotificationsScreen } from "../../screens/Notifications";

const Stack = createNativeStackNavigator();

export const NotificationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.notifications.notifications}
        component={NotificationsScreen}
        options={{ title: "Notificaciones" }}
      />
    </Stack.Navigator>
  );
};
