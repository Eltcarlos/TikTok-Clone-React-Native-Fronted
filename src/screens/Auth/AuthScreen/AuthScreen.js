import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { useTheme } from "../../../hooks";
import { styled } from "./AuthScreen.styles";
import { screen } from "../../../utils";

export const AuthScreen = (props) => {
  const { navigation } = props;
  const { toggleTheme } = useTheme();
  const styles = styled();

  const goToRegisterEmail = () => {
    navigation.navigate(screen.auth.registerEmail);
  };

  const goToLoginEmail = () => {
    navigation.navigate(screen.auth.loginEmail);
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.optionsContent}>
        <Text style={styles.title}>Registrate en TikTok</Text>
        <Text style={styles.info}>Crea un perfil, sigue otras cuentas, sube tus propios videos y más.</Text>
        <TouchableOpacity onPress={goToRegisterEmail} style={styles.itemRegister}>
          <Icon type="material-community" name="at" />
          <Text>Usar correo electronico</Text>
          <View />
        </TouchableOpacity>
      </View>

      <View style={styles.loginContent}>
        <Text>
          ¡Ya tienes una cuenta¡{" "}
          <Text style={styles.login} onPress={goToLoginEmail}>
            Iniciar sesión
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
