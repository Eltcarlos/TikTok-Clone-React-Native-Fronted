import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { styles } from "./RegisterEmailScreen.styles";
import { Auth } from "../../../api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterEmailScreen.data";

const auth = new Auth();

export const RegisterEmailScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((prevState) => !prevState);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await auth.register(formValue);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.form}>
        <Input
          placeholder="Correo Electronico"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text.toLowerCase())}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Nombre"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("first_name", text)}
          errorMessage={formik.errors.first_name}
        />
        <Input
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("username", text)}
          errorMessage={formik.errors.username}
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
        <Input
          placeholder="Repetir contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          errorMessage={formik.errors.repeatPassword}
        />
        <Button
          title="Registrarte"
          containerStyle={styles.btnContainer}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};
