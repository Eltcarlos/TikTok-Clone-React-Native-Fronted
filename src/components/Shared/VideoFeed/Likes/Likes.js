import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { styles } from "./Likes.styles";
import { nFormatter } from "../../../../utils";
import { Video } from "../../../../api";
import { useAuth } from "../../../../hooks";

const video = new Video();

export function Likes(props) {
  const { idVideo, likesCounter, idTargetUser } = props;
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(likesCounter);
  const { accessToken, auth } = useAuth();
  const idUser = auth.user_id;

  useEffect(() => {
    (async () => {
      try {
        const response = await video.isLike(accessToken, idVideo, idUser);
        setIsLike(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [idVideo, idUser]);

  const addLike = async () => {
    try {
      const newLikes = likes + 1;
      await video.createLike(accessToken, idVideo, idUser);
      await video.updateLikes(accessToken, idVideo, newLikes);
      setLikes(newLikes);
      setIsLike(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLike = async () => {
    try {
      const newLikes = likes - 1;
      const videoLike = await video.getLike(accessToken, idVideo, idUser);
      await video.deleteLike(accessToken, videoLike.id);
      await video.updateLikes(accessToken, idVideo, newLikes);

      setLikes(newLikes);
      setIsLike(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart"
        size={40}
        onPress={isLike ? deleteLike : addLike}
        iconStyle={isLike ? styles.likeOk : styles.like}
      />
      <Text>{nFormatter(likes)}</Text>
    </View>
  );
}
