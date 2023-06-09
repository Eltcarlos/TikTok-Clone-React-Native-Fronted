import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { Tab, TabView, Text } from "react-native-elements";
import { styles } from "./AccountScreen.styles";
import { User } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../hooks";
import { Account } from "../../../components/Account";

const userController = new User();

export const AccountScreen = (props) => {
  const { navigation } = props;
  const [tabActive, setTabActive] = useState(0);
  const [user, setUser] = useState(null);
  const { accessToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await userController.me(accessToken);
          navigation.setOptions({ title: response.first_name });
          setUser(response);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

  if (!user) return null;

  return (
    <ScrollView>
      <Account.Header avatar={user.avatar} username={user.username} />
      <Account.Follows idUser={user.id} />
      <Account.Settings instagram={user.instagram} />
      <Account.Info description={user.description} website={user.website} />
      <Tab value={tabActive} onChange={(e) => setTabActive(e)} indicatorStyle={styles.tabIndicator}>
        <Tab.Item containerStyle={styles.tabItemContainer} icon={{ type: "material-community", name: "grid" }} />
        <Tab.Item containerStyle={styles.tabItemContainer} icon={{ type: "material-community", name: "heart" }} />
      </Tab>
      <TabView value={tabActive} onChange={setTabActive} animationType="timing">
        <TabView.Item>
          <Account.Videos idUser={user.id} />
        </TabView.Item>
        <TabView.Item>
          <Account.VideosFavorites idUser={user.id} />
        </TabView.Item>
      </TabView>
    </ScrollView>
  );
};
