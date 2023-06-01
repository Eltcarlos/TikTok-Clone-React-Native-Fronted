import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Comments.style";
import { nFormatter } from "../../../../utils";

export const Comments = (props) => {
  const { idUser, idVideo } = props;

  const openSheet = () => {};

  return (
    <View style={styles.content}>
      <Icon type="material-community" name="comment-processing" size={40} onPress={openSheet} />
      <Text>{nFormatter(0)}</Text>
    </View>
  );
};
