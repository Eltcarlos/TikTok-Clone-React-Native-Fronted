import React, { useCallback, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-elements";
import { Video } from "expo-av";
import { styles } from "./VideoFeed.styles";
import { useFocusEffect } from "@react-navigation/native";
import { Info } from "./Info";
import { TimeLine } from "./TimeLine";
import { Profile } from "./Profile";
import { Likes } from "./Likes";
import { Comments } from "./Comments/Comments";
import { Share } from "./Share/Share";

export const VideoFeed = (props) => {
  const { item, index, indexShow, style } = props;
  const [isStarted, setIsStarted] = useState(false);
  const [videoStatus, setVideoStatus] = useState(null);
  const video = useRef(null);
  const user = item.user_data;
  useFocusEffect(
    useCallback(() => {
      setIsStarted(index === indexShow);

      return () => {
        setIsStarted(false);
      };
    }, [index, indexShow])
  );
  const startPauseVideo = () => setIsStarted((prevState) => !prevState);

  return (
    <Pressable style={[styles.content, style]} onPress={startPauseVideo}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: item.video }}
        resizeMode="cover"
        isLooping
        shouldPlay={isStarted}
        onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
      />

      <View style={styles.blockContent}>
        <View style={styles.blockLeft}>
          <Info username={user.username} description={item.description} />
        </View>
        <View style={styles.blockRight}>
          <Profile idUser={item.user} image={user.avatar} />
          <Likes idVideo={item.id} likesCounter={item.likes_counter} idTargetUser={user.id} />
          <Comments idUser={user.id} idVideo={item.id} />
          <Share idVideo={item.id} shareCounter={item.share_counter} idTargetUser={user.id} />
        </View>
      </View>

      {videoStatus && <TimeLine status={videoStatus} />}
    </Pressable>
  );
};
