import React, { useState } from "react";
import { View, Share as ShareRN } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Share.styles";
import { nFormatter, ENV } from "../../../../utils";
import { Video, Notification } from "../../../../api";
import { useAuth } from "../../../../hooks";

const video = new Video();
const notification = new Notification();

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
        await notification.create({
          token: accessToken,
          idUserFollower: auth.user_id,
          idTargetUser: idTargetUser,
          idVideo: idVideo,
          typeNotification: ENV.TYPE_NOTIFICATION.SHARED,
        });
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
