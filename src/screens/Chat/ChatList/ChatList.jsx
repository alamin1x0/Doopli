import { StyleSheet, FlatList, ActivityIndicator, KeyboardAvoidingView, VirtualizedList, Platform, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import SingleList from "./SingleList";
import { rs } from "../../../utils/styles/responsiveSize";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, getMoreConversations } from "../../../features/slices/chat/conversation";
import config from "../../../../config";
import { resetMessage } from "../../../features/slices/chat/messages";
import { useIsFocused, useTheme } from "@react-navigation/native";
import EmptyList from "./EmptyList";

const ChatList = () => {
  const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
  const {
    conversation, 
    loading, 
    next_page_url, 
    loadMore
  } = useSelector(state => state.conversations) || {};
  const {isLoading} = useSelector(state => state.deleteConversation);

  const conversationUrl = `${config.BASE_URL}/user/openai/chat/conversation`;

  const isFocused = useIsFocused()
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [longPress, setLongPress] = useState({});
  const [firstBackPress, setFirstBackPress] = useState(false);

  useEffect(() => {
    if(isFocused) dispatch(resetMessage());
    setLongPress({});
    setEditId(null);
  }, [isFocused])
  
  useEffect(() => {
    dispatch(getConversations({token, url: conversationUrl}));
  }, []);

  const handleMoreConversation = () => {
    let isMounted = true;
    if (isMounted && next_page_url && !loadMore) {
        dispatch(getMoreConversations({token, url:next_page_url}));
    }
    return () => isMounted = false;
  };

  const handleRefresh = () => {
    dispatch(getConversations({token, url: conversationUrl}));
    setLongPress({});
  };

  const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;
  
  const {colors} = useTheme();
  const chatListStyle= ChatListStyle(colors);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if(firstBackPress == false) {
          setFirstBackPress(true);
          setLongPress({});
          setEditId(null);
          return true
        }
        return false
      }
    );
    return () => subscription.remove();
  }, [firstBackPress])

  let content;
  if(loading) content = <ActivityIndicator style={chatListStyle.loading} size={"large"} />;
  if(!loading && conversation?.length > 0) {
    content = (
      <>
        <VirtualizedList
          data={conversation}
          getItem={getItem}
          getItemCount={getItemCount}
          keyExtractor={(item) => item?.id}
          renderItem={({item, index}) => (
            <SingleList 
              item={item}
              deleteId={deleteId}
              setDeleteId={setDeleteId}
              editId={editId}
              setEditId={setEditId}
              longPress={longPress}
              setLongPress={setLongPress}
              setFirstBackPress={setFirstBackPress}
              dataLength={conversation?.length}
              index={index}
            />)}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={10}
          onEndReachedThreshold={1}
          onEndReached={handleMoreConversation}
          onRefresh={!isLoading && handleRefresh}
          refreshing={false}
          contentContainerStyle={chatListStyle.content}
        />
        {loadMore && <ActivityIndicator size={"large"} />}
      </>
    )
  }
  if(!loading && conversation?.length == 0) {
    content = <FlatList
      listKey={(_, i) => i}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <EmptyList />}
      onRefresh={handleRefresh}
      refreshing={false}
    />
  }
  return (
    <KeyboardAvoidingView
      style={chatListStyle.keyboardAvoid} 
      behavior={Platform.OS == "ios" ? "padding" : ""}
    >
        {content}
    </KeyboardAvoidingView>
  )
};

export default ChatList;

const ChatListStyle = (colors) => StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  cont: {
    flex: 1,
    backgroundColor: colors.pageBg
  },
  loading: {
    marginTop: rs(20)
  },
  content: {
    paddingHorizontal: rs(15)
  }
})
