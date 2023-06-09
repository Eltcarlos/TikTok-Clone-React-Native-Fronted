import React from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Header.style";

export const Header = (props) => {
  const { onClose, commentCounter } = props;
  const getTextComment = () => {
    if (commentCounter === 1) return "comentario";
    return "comentarios";
  };
  return (
    <View style={styles.content}>
      <View />
      <Text>
        {commentCounter} {getTextComment()}
      </Text>
      <Icon type="material-community" name="close" size={16} onPress={onClose} />
    </View>
  );
};
