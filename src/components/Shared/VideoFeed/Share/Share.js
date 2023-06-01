import React, { useState } from "react";
import { View, Share as ShareRN } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Share.styles";
import { nFormatter } from "../../../../utils";
import { Video } from "../../../../api";
import { useAuth } from "../../../../hooks";

const video = new Video();

export const Share = (props) => {
  const { idVideo, shareCounter, idTargetUser } = props;
  const [counter, setCounter] = useState(shareCounter);
  const { accessToken, auth } = useAuth();
  const onShare = async () => {
    try {
      const result = await ShareRN.share({
        message: "Compartir video",
      });
      if (result.action === ShareRN.sharedAction) {
        onUpdateShareCounter();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onUpdateShareCounter = async () => {
    try {
      await video.shareVideo(accessToken, idVideo, shareCounter + 1);
      setCounter(shareCounter + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      <Icon type="material-community" name="share" size={40} onPress={onShare} />
      <Text>{nFormatter(counter)}</Text>
    </View>
  );
};
