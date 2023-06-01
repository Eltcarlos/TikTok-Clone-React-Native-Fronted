import React, { useCallback, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-elements";
import { Video } from "expo-av";
import { styles } from "./VideoFeed.styles";
import { useFocusEffect } from "@react-navigation/native";

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
          <Text>{item.user_data.username}</Text>
          <Text style={{ marginBottom: 20 }}>{item.description}</Text>
        </View>
        <View style={styles.blockRight}>
          <Text>PROFILE</Text>
          <Text>LIKES</Text>
          <Text>COMMENTS</Text>
          <Text>SHARE</Text>
        </View>
      </View>
    </Pressable>
  );
};
