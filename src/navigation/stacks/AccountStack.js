import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screen } from "../../utils";
import {
  AccountScreen,
  ChangeDescriptionScreen,
  ChangeInstagram,
  ChangeNameScreen,
  ChangeWebsiteScreen,
  SettingsScreen,
} from "../../screens/Account";

const Stack = createNativeStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.account.account} component={AccountScreen} options={{ title: "" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name={screen.account.settings} component={SettingsScreen} options={{ title: "Ajustes" }} />
        <Stack.Screen name={screen.account.changeName} component={ChangeNameScreen} options={{ title: "Nombre" }} />
        <Stack.Screen
          name={screen.account.changeDescription}
          component={ChangeDescriptionScreen}
          options={{ title: "Description corta" }}
        />
        <Stack.Screen
          name={screen.account.changeWebsite}
          component={ChangeWebsiteScreen}
          options={{ title: "Sitio Web" }}
        />
        <Stack.Screen
          name={screen.account.changeInstagram}
          component={ChangeInstagram}
          options={{ title: "Instagram" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
