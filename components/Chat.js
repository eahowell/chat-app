import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
} from "react-native-gifted-chat";
import colorMatrix from "../colorMatrix";

const Chat = ({ route, navigation }) => {
  const { name, chatBackgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  const selectedColorScheme = colorMatrix.find(
    (color) => color.backgroundColor === chatBackgroundColor
  );

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
            backgroundColor: selectedColorScheme.bubbleColor,
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
        textStyle={{
          right: {
            color: selectedColorScheme.bubbleColorText,
          },
        }}
        timeTextStyle={{
          right: {
            color: selectedColorScheme.bubbleColorText,
          },
          left: {
            color: "Black",
          },
        }}
        accessibilityLabel={`Message from ${props.currentMessage.user.name}: ${props.currentMessage.text}`}
        accessibilityRole="text"
      />
    );
  };

  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      textStyle={{
        color: selectedColorScheme.systemMessageTextColor,
      }}
    />
  );

  const renderDay = (props) => (
    <Day
      {...props}
      textStyle={{
        color: selectedColorScheme.systemMessageTextColor,
      }}
    />
  );

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
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        maxComposerHeight={100}
        minComposerHeight={Platform.OS === "ios" ? 40 : 60}
        textInputProps={{
          importantForAccessibility: "yes",
          accessible: true,
          accessibilityRole: "text",
          accessibilityHint: "Type your message here",
          accessibilityLabel:null,
          multiline: true,
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
