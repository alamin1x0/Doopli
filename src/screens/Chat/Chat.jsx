import React from "react";
import { StyleSheet, View } from "react-native";
import ChatList from "./ChatList/ChatList";
import FloatingBtn from "./ChatList/FloatingBtn";

const Chat = () => {
  const chatStyle = ChatStyle()
  return (
    <View style={chatStyle.cont}>
      <FloatingBtn />
      <ChatList />
    </View>
  );
};

export default Chat;

const ChatStyle = () => StyleSheet.create({
    cont: {
        flex: 1,
    }
})
