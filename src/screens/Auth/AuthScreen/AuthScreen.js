import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useTheme } from "../../../hooks";

export const AuthScreen = () => {
  const { toggleTheme } = useTheme();
  return (
    <View>
      <Text>AuthScreen</Text>
      <Button title="Cambiar Tema" onPress={toggleTheme} />
    </View>
  );
};
