import React, { useEffect, useRef, useState } from "react";
import { FlatList, Dimensions, View } from "react-native";
import { Video } from "../../api";
import { useAuth } from "../../hooks";
import { ENV } from "../../utils";
import { VideoFeed } from "../Shared";

const { height } = Dimensions.get("window");
const videoController = new Video();

export const ForYouVideos = () => {
  const [videos, setVideos] = useState(null);
  const [indexStart, setIndexStart] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      (async () => {
        try {
          const response = await videoController.getAllVideos(accessToken);
          setVideos(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [accessToken]);

  const onViewChangeRef = useRef(({ viewableItems }) => {
    setIndexStart(viewableItems[0].index);
  });

  if (!videos) return null;

  return (
    <FlatList
      data={videos}
      decelerationRate="fast"
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => <VideoFeed index={index} item={item} indexShow={indexStart} />}
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
      snapToInterval={height - ENV.TAB_MENU_HEIGHT}
      onViewableItemsChanged={onViewChangeRef.current}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      initialScrollIndex={indexStart}
      onScrollToIndexFailed={() => {}}
    />
  );
};
