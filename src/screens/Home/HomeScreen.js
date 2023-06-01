import React, { useState } from "react";
import { View } from "react-native";
import { FollowingVideos, ForYouVideos, Header } from "../../components/Home";
import { ENV } from "../../utils";

export const HomeScreen = () => {
  const [typeVideos, setTypeVideos] = useState(ENV.TYPE_VIDEO.FOR_YOU);

  return (
    <View>
      <Header typeVideos={typeVideos} setTypeVideos={setTypeVideos} />
      {typeVideos === ENV.TYPE_VIDEO.FOR_YOU ? <ForYouVideos /> : <FollowingVideos />}
    </View>
  );
};
