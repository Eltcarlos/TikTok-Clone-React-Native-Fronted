import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./LoginEmailScreen.styles";
import { Button, Input } from "react-native-elements";
import { initialValues, validationSchema } from "./LoginEmailScreen.data";
import { Auth } from "../../../api";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";

const auth = new Auth();

export const LoginEmailScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((prevState) => !prevState);
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await auth.login(formValue);
        login(response);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.form}>
        <Input
          placeholder="Correo electronico"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text.toLowerCase())}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          errorMessage={formik.errors.password}
        />
      </View>

      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </SafeAreaView>
  );
};
