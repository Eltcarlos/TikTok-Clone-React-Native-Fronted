import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Share.styles";
import { nFormatter } from "../../../../utils";

export const Share = (props) => {
  const { idVideo, shareCounter, idTargetUser } = props;
  const onShare = () => {};
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="share" size={40} onPress={onShare} />
      <Text>{nFormatter(shareCounter)}</Text>
    </View>
  );
};
