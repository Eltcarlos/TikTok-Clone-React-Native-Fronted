import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { Icon, Text } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import { styled } from "./Comments.style";
import { nFormatter } from "../../../../utils";
import { Comment as CommentController } from "../../../../api";
import { Header } from "./Header";
import { useAuth } from "../../../../hooks";
import { size } from "lodash";
import { Comment } from "./Comment/Comment";
import { CommentForm } from "./CommentForm";

const { height } = Dimensions.get("screen");
const commentController = new CommentController();

export const Comments = (props) => {
  const { idUser, idVideo } = props;
  const sheet = useRef();
  const styles = styled();
  const { accessToken } = useAuth();
  const openSheet = () => sheet.current.open();
  const closeSheet = () => sheet.current.close();
  const onReloadComments = () => setReloadComment((prevState) => !prevState);
  const [comments, setComments] = useState(null);
  const totalComments = size(comments);
  const [reloadComment, setReloadComment] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await commentController.getCommentsVideo(accessToken, idVideo);
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reloadComment]);

  return (
    <>
      <View style={styles.content}>
        <Icon type="material-community" name="comment-processing" size={40} onPress={openSheet} />
        <Text>{nFormatter(totalComments)}</Text>
      </View>

      <RBSheet
        ref={sheet}
        height={height - 200}
        openDuration={200}
        keyboardAvoidingViewEnabled={false}
        customStyles={{
          container: styles.rbSheetContainer,
        }}
      >
        <Header onClose={closeSheet} commentCounter={size(comments)} />
        <FlatList
          data={comments}
          renderItem={({ item }) => <Comment comment={item} onReloadComments={onReloadComments} />}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          ListEmptyComponent={<Text style={styles.noCommentText}>Se el primero en comentar</Text>}
        />

        <CommentForm idTargetUser={idUser} idVideo={idVideo} onReloadComments={onReloadComments} />
      </RBSheet>
    </>
  );
};
