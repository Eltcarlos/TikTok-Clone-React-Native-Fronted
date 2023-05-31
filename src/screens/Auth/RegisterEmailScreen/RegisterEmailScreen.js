import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { styles } from "./RegisterEmailScreen.styles";

export const RegisterEmailScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((prevState) => !prevState);
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.form}>
        <Input placeholder="Correo Electronico" autoCapitalize="none" />
        <Input placeholder="Nombre" autoCapitalize="none" />
        <Input placeholder="Username" autoCapitalize="none" />
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
        />
        <Input
          placeholder="Repetir contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
        />
        <Button title="Registrarte" containerStyle={styles.btnContainer} />
      </View>
    </SafeAreaView>
  );
};
