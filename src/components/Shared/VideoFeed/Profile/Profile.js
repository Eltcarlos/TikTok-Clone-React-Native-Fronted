import React from "react";
import { View } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./Profile.styles";
import { useAuth } from "../../../../hooks";
import { LOGO } from "../../../../../assets/images";
import { screen } from "../../../../utils";

export const Profile = (props) => {
  const { idUser, image } = props;
  const { auth } = useAuth();
  const isMyVideo = idUser === auth.user_id;
  const { name } = useRoute();
  const navigation = useNavigation();

  const goToProfile = () => {
    if (isMyVideo && name === screen.home.home) {
      navigation.navigate(screen.account.tab, { screen: screen.account.account });
    } else {
      navigation.navigate(screen.app.user, { idUser });
    }
  };
  const follow = () => {};
  return (
    <View style={styles.content}>
      <Avatar
        rounded
        source={image ? { uri: image } : LOGO}
        size={40}
        avatarStyle={styles.avatar}
        onPress={goToProfile}
      />
      <Icon type="material-community" name="plus" size={14} containerStyle={styles.iconContainer} onPress={follow} />
    </View>
  );
};
