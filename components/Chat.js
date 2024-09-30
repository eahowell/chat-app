import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, chatBackgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  // const {chatBackgroundColor, setChatBackgroundColor} = useState(backgroundColor);
  // const chatBackgroundColor = backgroundColor;

  // useEffect(() => {
  //   setChatBackgroundColor(backgroundColor);
  // }, [backgroundColor]);

  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://picsum.photos/id/40/140/140",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor:
              chatBackgroundColor === "#090C08" ? "#474056" : "#090C08",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: chatBackgroundColor }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      ></KeyboardAvoidingView>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
