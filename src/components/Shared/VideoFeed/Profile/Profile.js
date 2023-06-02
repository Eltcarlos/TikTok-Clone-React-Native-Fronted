import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./Profile.styles";
import { useAuth } from "../../../../hooks";
import { LOGO } from "../../../../../assets/images";
import { screen } from "../../../../utils";
import { Follow } from "../../../../api";

const followController = new Follow();

export const Profile = (props) => {
  const { idUser, image } = props;
  const { accessToken, auth } = useAuth();
  const [isFollowing, setIsFollowing] = useState(true);
  const isMyVideo = idUser === auth.user_id;
  const { name } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const response = await followController.isFollowing(accessToken, auth.user_id, idUser);
        setIsFollowing(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const goToProfile = () => {
    if (isMyVideo && name === screen.home.home) {
      navigation.navigate(screen.account.tab, { screen: screen.account.account });
    } else {
      navigation.navigate(screen.app.user, { idUser });
    }
  };
  const follow = async () => {
    try {
      await followController.follow(accessToken, auth.user_id, idUser);
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.content}>
      <Avatar
        rounded
        source={image ? { uri: image } : LOGO}
        size={40}
        avatarStyle={styles.avatar}
        onPress={goToProfile}
      />
      {!isMyVideo && !isFollowing && (
        <Icon type="material-community" name="plus" size={14} containerStyle={styles.iconContainer} onPress={follow} />
      )}
    </View>
  );
};
