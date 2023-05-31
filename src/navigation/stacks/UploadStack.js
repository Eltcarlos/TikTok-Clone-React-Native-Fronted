import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screen } from "../../utils";
import { UploadScreen } from "../../screens/Upload/UploadScreen";
import { PublishVideoScreen } from "../../screens/Upload/PublishVideoScreen";

const Stack = createNativeStackNavigator();

export const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen.upload.upload} component={UploadScreen} options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name={screen.upload.publishVideo}
        component={PublishVideoScreen}
        options={{ title: "Publicar", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
